/**
 * Static, server-rendered wireframe globe. It is the hero image for every visitor
 * (fast LCP, no JavaScript) and the fallback when 3D is unavailable or motion is reduced.
 */
const R = 200;
const C = 250;
const tilt = (-18 * Math.PI) / 180;
const rot = (25 * Math.PI) / 180;

function proj(lat: number, lon: number) {
  const x = R * Math.cos(lat) * Math.sin(lon + rot);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.cos(lon + rot);
  const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
  const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
  return [C + x, C - y2, z2] as const;
}

const f = (n: number) => n.toFixed(1);
const rad = (d: number) => (d * Math.PI) / 180;

const lines: string[] = [];
for (let lat = -75; lat <= 75; lat += 15) {
  const pts: string[] = [];
  for (let l = 0; l <= 360; l += 6) {
    const [x, y] = proj(rad(lat), rad(l));
    pts.push(`${f(x)},${f(y)}`);
  }
  lines.push(pts.join(" "));
}
for (let lon = 0; lon < 180; lon += 15) {
  const pts: string[] = [];
  for (let la = -90; la <= 90; la += 5) {
    const [x, y] = proj(rad(la), rad(lon));
    pts.push(`${f(x)},${f(y)}`);
  }
  for (let la = 90; la >= -90; la -= 5) {
    const [x, y] = proj(rad(la), rad(lon + 180));
    pts.push(`${f(x)},${f(y)}`);
  }
  lines.push(pts.join(" "));
}

// Deterministic node distribution (Fibonacci sphere)
const nodes = Array.from({ length: 42 }, (_, i) => {
  const y = 1 - (i / 41) * 2;
  const lat = Math.asin(y * 0.94);
  const lon = i * 2.399963;
  return proj(lat, lon);
});

const links: [number, number][] = [];
nodes.forEach((a, i) => {
  nodes
    .map((b, j) => ({ j, d: Math.hypot(a[0] - b[0], a[1] - b[1]) + Math.abs(a[2] - b[2]) * 0.5 }))
    .filter((x) => x.j !== i)
    .sort((p, q) => p.d - q.d)
    .slice(0, 2)
    .forEach(({ j }) => {
      if (i < j) links.push([i, j]);
    });
});

const v = (name: string) => `var(--c-${name})`;

export function GlobeSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="g-core" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" style={{ stopColor: v("emerald"), stopOpacity: 0.28 }} />
          <stop offset="0.6" style={{ stopColor: v("teal"), stopOpacity: 0.14 }} />
          <stop offset="1" style={{ stopColor: v("bg"), stopOpacity: 0.1 }} />
        </radialGradient>
        <linearGradient id="g-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: v("mint") }} />
          <stop offset="1" style={{ stopColor: v("lime") }} />
        </linearGradient>
        <filter id="g-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={C} cy={C} r={R + 40} style={{ fill: v("emerald") }} opacity="0.08" />
      <circle cx={C} cy={C} r={R} fill="url(#g-core)" />
      <g fill="none" strokeWidth="0.8" opacity="0.35" style={{ stroke: v("teal") }}>
        {lines.map((p, i) => (
          <polyline key={i} points={p} />
        ))}
      </g>
      <circle cx={C} cy={C} r={R} fill="none" strokeOpacity="0.6" strokeWidth="1.4" filter="url(#g-glow)" style={{ stroke: v("mint") }} />
      <g>
        {links.map(([i, j]) => {
          const a = nodes[i];
          const b = nodes[j];
          const front = (a[2] + b[2]) / 2 > -20;
          return (
            <line
              key={`${i}-${j}`}
              x1={f(a[0])}
              y1={f(a[1])}
              x2={f(b[0])}
              y2={f(b[1])}
              stroke="url(#g-link)"
              strokeWidth={front ? 1.3 : 0.8}
              opacity={front ? 0.8 : 0.18}
            />
          );
        })}
      </g>
      <g filter="url(#g-glow)">
        {nodes.map(([x, y, z], i) => (
          <circle key={i} cx={f(x)} cy={f(y)} r={z > 0 ? 3 : 1.8} style={{ fill: z > 0 ? v("mint") : v("teal") }} opacity={z > 0 ? 0.95 : 0.35} />
        ))}
      </g>
      <g fill="none" strokeWidth="1.3">
        <ellipse cx={C} cy={C} rx="245" ry="78" transform={`rotate(-14 ${C} ${C})`} style={{ stroke: v("emerald") }} opacity="0.45" />
        <ellipse cx={C} cy={C} rx="232" ry="112" transform={`rotate(28 ${C} ${C})`} style={{ stroke: v("lime") }} opacity="0.35" strokeDasharray="2 9" />
      </g>
    </svg>
  );
}
