import type { NextConfig } from "next";

/**
 * Üretim ayarları — performans ve güvenlik başlıkları.
 * Lighthouse / Search Console denetimlerinde beklenen asgari set.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // Portreler ve protokol kareleri; gereksiz büyük varyant üretilmesin.
    imageSizes: [64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Üretilen ikon ve görseller uzun süre önbelleklensin.
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
