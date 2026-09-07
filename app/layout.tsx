// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoid.co.kr"),
  title: "HOiD — 기술로 완성한 클린 라이프",
  description:
    "HOiD 공식 브랜드 사이트. 에어로퓨전 공기청정 냉온풍기 5in1부터 무선청소기, 무빙 스마트TV, 제습기까지 — 기술로 완성한 클린 라이프를 만나보세요.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  other: {
    "naver-site-verification": "89b9949c7b22e05e163144dbad980aaa315a060b",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    url: "https://hoid.co.kr/",
    siteName: "HOiD",
    locale: "ko_KR",
    title: "HOiD — 기술로 완성한 클린 라이프",
    description:
      "에어로퓨전 공기청정 냉온풍기 5in1 — 냉풍·온풍·공기청정·음이온·UV살균을 한 대로. 계절마다 가전을 바꾸지 않아도 되는 올시즌 에어 솔루션.",
    images: [
      {
        url: "https://hoid.co.kr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HOiD 에어로퓨전",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOiD — 기술로 완성한 클린 라이프",
    description: "에어로퓨전 공기청정 냉온풍기 5in1 — 한 대로 사계절.",
    images: ["https://hoid.co.kr/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Serif+KR:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0e1116" />
      </head>
      <body className="font-pretendard">{children}</body>
    </html>
  );
}
