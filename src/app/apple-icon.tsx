import { ImageResponse } from "next/og";
import { MARK } from "@/content/logo-geometry";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d={MARK.hex} fill="none" stroke="#00a152" strokeWidth={MARK.hexStroke} strokeLinejoin="round" />
          <path d={MARK.x} stroke="#00a152" strokeWidth={MARK.xStroke} strokeLinecap="round" />
          <circle cx="16" cy="16" r={MARK.dot} fill="#00a152" />
        </svg>
      </div>
    ),
    size,
  );
}
