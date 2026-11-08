"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Progressive enhancement: the server-rendered SVG globe (children) shows first.
 * On capable devices without reduced motion, a lazily-loaded Three.js globe fades in over it.
 */
function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 4) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroGlobe({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !canUse3D()) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 700ms ease";
      host.appendChild(renderer.domElement);

      const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim();
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(css("bg") || "#0a0a0a", 4.2, 8);
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 5.6);

      // Soft round sprite so points render as glowing dots rather than squares
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = 64;
      const ctx2d = dotCanvas.getContext("2d")!;
      const grad = ctx2d.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, 64, 64);
      const dot = new THREE.CanvasTexture(dotCanvas);

      const globe = new THREE.Group();
      globe.rotation.x = 0.32;
      scene.add(globe);
      const R = 1.6;

      // Latitude / longitude wireframe
      const wire: number[] = [];
      const seg = 72;
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (lat * Math.PI) / 180;
        for (let i = 0; i < seg; i++) {
          const a = (i / seg) * Math.PI * 2;
          const b = ((i + 1) / seg) * Math.PI * 2;
          const r = R * Math.cos(phi);
          const y = R * Math.sin(phi);
          wire.push(r * Math.cos(a), y, r * Math.sin(a), r * Math.cos(b), y, r * Math.sin(b));
        }
      }
      for (let lon = 0; lon < 180; lon += 15) {
        const t = (lon * Math.PI) / 180;
        for (let i = 0; i < seg; i++) {
          const a = (i / seg) * Math.PI * 2;
          const b = ((i + 1) / seg) * Math.PI * 2;
          wire.push(
            R * Math.cos(a) * Math.cos(t), R * Math.sin(a), R * Math.cos(a) * Math.sin(t),
            R * Math.cos(b) * Math.cos(t), R * Math.sin(b), R * Math.cos(b) * Math.sin(t),
          );
        }
      }
      const wireGeo = new THREE.BufferGeometry();
      wireGeo.setAttribute("position", new THREE.Float32BufferAttribute(wire, 3));
      const wireMat = new THREE.LineBasicMaterial({ color: css("teal"), transparent: true, opacity: 0.4 });
      globe.add(new THREE.LineSegments(wireGeo, wireMat));

      // Network nodes (Fibonacci sphere) and nearest-neighbour links
      const count = 64;
      const pts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = i * 2.399963;
        pts.push(new THREE.Vector3(Math.cos(th) * r * R, y * R * 0.97, Math.sin(th) * r * R));
      }
      const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const nodeMat = new THREE.PointsMaterial({ map: dot, color: css("mint"), size: 0.11, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
      globe.add(new THREE.Points(nodeGeo, nodeMat));

      const linkPos: number[] = [];
      const linkCol: number[] = [];
      const cA = new THREE.Color(css("mint"));
      const cB = new THREE.Color(css("lime"));
      pts.forEach((p, i) => {
        pts
          .map((q, j) => ({ j, d: p.distanceTo(q) }))
          .filter((x) => x.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 3)
          .forEach(({ j }) => {
            if (i > j) return;
            const q = pts[j];
            linkPos.push(p.x, p.y, p.z, q.x, q.y, q.z);
            linkCol.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
          });
      });
      const linkGeo = new THREE.BufferGeometry();
      linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkPos, 3));
      linkGeo.setAttribute("color", new THREE.Float32BufferAttribute(linkCol, 3));
      const linkMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7 });
      globe.add(new THREE.LineSegments(linkGeo, linkMat));

      // Orbit rings with travelling data packets
      const rings = new THREE.Group();
      scene.add(rings);
      const ringDefs = [
        { rx: 2.25, ry: 0.72, rot: -0.25, color: "emerald", speed: 0.35 },
        { rx: 2.1, ry: 1.0, rot: 0.5, color: "lime", speed: -0.25 },
      ];
      const packets: { mesh: InstanceType<typeof THREE.Points>; rx: number; ry: number; speed: number; t: number }[] = [];
      const disposables: { dispose: () => void }[] = [dot, wireGeo, wireMat, nodeGeo, nodeMat, linkGeo, linkMat];
      const ringMats: { mat: InstanceType<typeof THREE.LineBasicMaterial>; token: string }[] = [];
      const packetMats: InstanceType<typeof THREE.PointsMaterial>[] = [];
      ringDefs.forEach((d, idx) => {
        const curve = new THREE.EllipseCurve(0, 0, d.rx, d.ry, 0, Math.PI * 2);
        const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0)));
        const m = new THREE.LineBasicMaterial({ color: css(d.color), transparent: true, opacity: 0.45 });
        ringMats.push({ mat: m, token: d.color });
        const ring = new THREE.LineLoop(g, m);
        const holder = new THREE.Group();
        holder.rotation.z = d.rot;
        holder.rotation.x = 1.15;
        holder.add(ring);
        const pg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]);
        const pm = new THREE.PointsMaterial({ map: dot, color: css("mint-soft"), size: 0.2, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        packetMats.push(pm);
        const packet = new THREE.Points(pg, pm);
        holder.add(packet);
        packets.push({ mesh: packet, rx: d.rx, ry: d.ry, speed: d.speed, t: idx * 2 });
        rings.add(holder);
        disposables.push(g, m, pg, pm);
      });

      // Re-colour when the visitor switches theme; additive glow only suits the dark theme.
      const applyTheme = () => {
        const light = document.documentElement.getAttribute("data-theme") === "light";
        (scene.fog as InstanceType<typeof THREE.Fog>).color.set(css("bg"));
        wireMat.color.set(css("teal"));
        nodeMat.color.set(css("mint"));
        cA.set(css("mint"));
        cB.set(css("lime"));
        const col = linkGeo.getAttribute("color");
        for (let k = 0; k < col.count; k++) {
          const c = k % 2 === 0 ? cA : cB;
          col.setXYZ(k, c.r, c.g, c.b);
        }
        col.needsUpdate = true;
        ringMats.forEach(({ mat, token }) => mat.color.set(css(token)));
        const blend = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        [nodeMat, ...packetMats].forEach((m) => {
          m.blending = blend;
          m.needsUpdate = true;
        });
        packetMats.forEach((m) => m.color.set(css(light ? "emerald" : "mint-soft")));
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) loop();
      });
      io.observe(host);

      const clock = new THREE.Clock();
      let raf = 0;
      let first = true;
      function loop() {
        cancelAnimationFrame(raf);
        if (!visible || document.hidden) return;
        raf = requestAnimationFrame(loop);
        const dt = Math.min(clock.getDelta(), 0.05);
        globe.rotation.y += dt * 0.12;
        globe.rotation.x += (0.32 + pointer.y * 0.12 - globe.rotation.x) * 0.04;
        rings.rotation.y += (pointer.x * 0.2 - rings.rotation.y) * 0.04;
        packets.forEach((p) => {
          p.t += dt * p.speed;
          p.mesh.position.set(Math.cos(p.t) * p.rx, Math.sin(p.t) * p.ry, 0);
        });
        renderer.render(scene, camera);
        if (first) {
          first = false;
          renderer.domElement.style.opacity = "1";
          setReady(true);
        }
      }
      const onVis = () => {
        if (!document.hidden) {
          clock.getDelta();
          loop();
        }
      };
      document.addEventListener("visibilitychange", onVis);
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        themeObserver.disconnect();
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVis);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
      setReady(false);
    };
  }, []);

  return (
    <div ref={hostRef} className="relative aspect-square w-full">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>{children}</div>
    </div>
  );
}
