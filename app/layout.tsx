import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fukuoka-family-trip-2026.kslin.chatgpt.site"),
  title: "2026 福岡・北九州・豪斯登堡親子旅行｜FUKUOKA FAMILY GUIDE",
  description:
    "2026/08/11–08/19 福岡、北九州與豪斯登堡 9 天 8 夜親子旅行，包含住宿、交通、餐廳與 Google 地圖連結。",
  openGraph: {
    title: "2026 福岡・北九州・豪斯登堡親子旅行",
    description: "8/11–8/19 福岡親子旅行：每日景點、住宿切換、JR Pass 與 Google 地圖入口。",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 912, alt: "FUKUOKA FAMILY GUIDE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 福岡・北九州・豪斯登堡親子旅行",
    description: "8/11–8/19 福岡親子旅行行程與地圖清單。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
