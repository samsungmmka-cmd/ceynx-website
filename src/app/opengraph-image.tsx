import { ImageResponse } from "next/og";
import { LOGO_RATIO, logoSvg } from "@/content/logo-geometry";
import { site } from "@/lib/site";

const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg({ green: "#00e676", ink: "#ffffff", dot: "#ffffff" })).toString("base64")}`;

export const alt = `${site.name} — ${site.tagline} SaaS platforms, AI agents and custom software.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const pills = ["SaaS Platforms", "AI Agents", "Custom Software"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "radial-gradient(circle at 80% 20%, #1f1f1f 0%, #111111 40%, #0a0a0a 75%)",
          color: "#e5e5e5",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#00e676", fontWeight: 400 }}>SAAS · AI AGENTS · CUSTOM SOFTWARE</div>
        <img src={logoSrc} alt="CEYNX"width={Math.round(120 * LOGO_RATIO)} height={120} style={{ marginTop: 36, marginBottom: 36 }} />
        <div style={{ display: "flex", fontSize: 54, fontWeight: 400 }}>
          Intelligence that&nbsp;<span style={{ color: "#00e676", fontWeight: 800 }}>connects.</span>
        </div>
        <div style={{ display: "flex", marginTop: 48, gap: 16 }}>
          {pills.map((p) => (
            <div key={p} style={{ display: "flex", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 999, padding: "10px 26px", fontSize: 26, background: "rgba(20,20,20,0.85)" }}>
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
