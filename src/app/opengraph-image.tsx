import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getPerson } from "@/lib/person";

export const alt = "Elif Eda Türkmen — Yatırımcı & Finans Eğitmeni";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Türkçe büyük harf: i → İ (varsayılan tr olmayan dönüşüm "I" verir). */
function upperTr(value: string) {
  return value.replace(/i/g, "İ").toLocaleUpperCase("tr-TR");
}

/** Paylaşım görseli — "Sinyal" dili: antrasit zemin, kırmızı vurgu. */
export default async function Image() {
  const { profile, seo } = getPerson();

  const fontDir = join(process.cwd(), "src", "fonts");
  const [regular, extraBold] = await Promise.all([
    readFile(join(fontDir, "Archivo-400.ttf")),
    readFile(join(fontDir, "Archivo-800.ttf")),
  ]);

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
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 20, height: 20, background: "#c4161c" }} />
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: 4,
              color: "#a9adb4",
            }}
          >
            {upperTr(seo.siteName)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: -4,
              color: "#f5f3f0",
              display: "flex",
            }}
          >
            {upperTr(`${profile.firstName} ${profile.lastName}`)}
            <span style={{ color: "#c4161c" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid #34363b",
              fontSize: 34,
              fontWeight: 400,
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
            fontWeight: 400,
            letterSpacing: 3,
            color: "#6b6f76",
          }}
        >
          <span>{upperTr(profile.location)}</span>
          <span style={{ color: "#c4161c" }}>·</span>
          <span>{upperTr(new URL(seo.url).host)}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
      ],
    }
  );
}
