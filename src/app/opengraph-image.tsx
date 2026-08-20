import { ImageResponse } from "next/og";
import { getPerson } from "@/lib/person";

export const alt = "Elif Eda Türkmen — Yatırımcı & Finans Eğitmeni";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Paylaşım görseli — "Sinyal" dili: antrasit zemin, kırmızı vurgu. */
export default async function Image() {
  const { profile, seo } = getPerson();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17181a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 20, height: 20, background: "#c4161c" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a9adb4",
            }}
          >
            {seo.siteName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              lineHeight: 0.86,
              fontWeight: 800,
              letterSpacing: -6,
              color: "#f5f3f0",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {profile.firstName} {profile.lastName}
            <span style={{ color: "#c4161c" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid #34363b",
              fontSize: 34,
              color: "#a9adb4",
              display: "flex",
            }}
          >
            {profile.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6b6f76",
          }}
        >
          <span>{profile.location}</span>
          <span style={{ color: "#c4161c" }}>·</span>
          <span>elifeda.com.tr</span>
        </div>
      </div>
    ),
    size
  );
}
