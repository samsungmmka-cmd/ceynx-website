import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z" fill="none" stroke="#00a152" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M10.5 11.5 21.5 20.5M21.5 11.5 10.5 20.5" stroke="#00a152" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.4" fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
