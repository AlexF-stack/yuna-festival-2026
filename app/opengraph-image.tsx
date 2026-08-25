import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YUNA Festival 2026, Bénin Debout";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #FFFFFF 0%, #E8F4FB 45%, #0077BB 120%)",
          color: "#1A1A1A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#FF6600",
            fontWeight: 700,
          }}
        >
          5–6 septembre 2026 · Terrain de Midombo
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 24,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#0077BB" }}>Bénin</span>
          <span style={{ color: "#FF6600" }}>Debout</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#444444",
            maxWidth: 900,
          }}
        >
          YUNA Festival 2026. Entrée libre · Terrain de Midombo
        </div>
      </div>
    ),
    { ...size },
  );
}
