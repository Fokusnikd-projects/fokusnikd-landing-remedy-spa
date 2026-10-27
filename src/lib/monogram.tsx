import { ImageResponse } from "next/og";

export function monogram(px: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E4A3B",
          color: "#F7F3EC",
          fontSize: Math.round(px * 0.62),
          letterSpacing: "-0.04em",
        }}
      >
        R
      </div>
    ),
    { width: px, height: px },
  );
}

export function spaCard(locale: string) {
  const vi = locale === "vi";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#F7F3EC",
          color: "#1E2621",
          padding: "72px",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2E4A3B",
            color: "#F7F3EC",
            borderRadius: 40,
            fontSize: 140,
          }}
        >
          R
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 64,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 84, color: "#2E4A3B" }}>Remedy Spa</div>
          <div style={{ fontSize: 36, marginTop: 28, color: "#7A5E33" }}>
            {vi ? "4.7★ · 201 đánh giá trên Google" : "4.7★ · 201 Google reviews"}
          </div>
          <div style={{ fontSize: 32, marginTop: 18 }}>
            {vi ? "Quận 1, TP. Hồ Chí Minh" : "Quận 1, Ho Chi Minh City"}
          </div>
          <div style={{ fontSize: 32, marginTop: 12 }}>
            {vi ? "Mở cửa hằng ngày 09:00–23:45" : "Open daily 09:00–23:45"}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
