import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumen Vestire — Tailored light. Worn right.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f6f1e7 0%, #ece2cf 100%)",
          color: "#1f1d1a",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a47e3b",
            marginBottom: 24,
          }}
        >
          Lumen · Vestire
        </div>
        <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 500 }}>
          Tailored light.
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1,
            fontWeight: 500,
            fontStyle: "italic",
            color: "#a47e3b",
          }}
        >
          Worn right.
        </div>
      </div>
    ),
    { ...size }
  );
}
