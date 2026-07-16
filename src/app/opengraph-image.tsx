import { ImageResponse } from "next/og";

export const alt = "PromptForge AI — Build, Improve & Optimize AI Prompts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
          PromptForge AI
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "#a3a3a3" }}>
          Build, improve, and optimize AI prompts
        </div>
      </div>
    ),
    { ...size }
  );
}
