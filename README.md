# elifeda.com.tr

Elif Eda Türkmen — kişisel site. Next.js (App Router) + Tailwind CSS v4.

## Veri kaynağı

Sitedeki tüm metin, bağlantı ve SEO verisi tek dosyadan gelir:
`src/person.json`. Bu dosya `src/lib/person.ts` içinde Zod ile doğrulanır;
eksik/hatalı alan build'i anlamlı bir hatayla durdurur. Bileşenler
`person.json`'ı doğrudan import etmez, `getPerson()` üzerinden okur.

## Tasarım dili — "Sinyal"

Antrasit + kağıt beyazı + sinyal kırmızısı. Hiyerarşi gölge veya
yuvarlatma ile değil; hairline çizgiler, numaralı folyolar ve asimetrik
ızgara ile kurulur. Kural: **hiçbir yerde border-radius ve box-shadow yok.**
Tek yazı ailesi: Archivo.

## Komutlar

```bash
npm run dev     # geliştirme
npm run build   # üretim derlemesi
npm run start   # üretim sunucusu
npm run lint    # eslint
```

## Tamamlanmayı bekleyenler

- `seo.googleSiteVerification` — Search Console doğrulama kodu
- `contact.email` — iletişim e-postası
- `socials` — sosyal medya hesapları (şu an boş)
- `brokers` — Pusula Yatırım referansı eklendi, onay bekliyor
