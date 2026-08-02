import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fukuoka-family-trip-2026.kslin.chatgpt.site"),
  title: "FUKUOKA FAMILY GUIDE｜福岡 9 日家庭行程",
  description:
    "2026 年 8 月 11 日至 19 日的福岡家庭旅行行程，包含每日景點、JR 周遊券日、餐廳與 Google 地圖連結。",
  openGraph: {
    title: "FUKUOKA FAMILY GUIDE｜福岡 9 日家庭行程",
    description: "8/11–8/19 福岡親子旅行：每日景點、JR Pass 與 Google 地圖入口。",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 912, alt: "FUKUOKA FAMILY GUIDE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUKUOKA FAMILY GUIDE｜福岡 9 日家庭行程",
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
