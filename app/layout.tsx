// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://hoid.co.kr'),
  // ✅ 제목에 보조 문구(기존 description 핵심)를 합쳐서 카카오 미리보기에 노출
  title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
  // ↘ description은 유지(다른 플랫폼 및 SEO용). 카카오에선 노출 안 될 수 있음.
  description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  other: {
    'naver-site-verification': 'ef8eea773f3a0a223a19f8e1adcae83cececeb97',
  },

  openGraph: {
    type: 'website',
    url: 'https://hoid.co.kr/', // URL 고정으로 캐시/식별 안정화
    siteName: 'HOID',
    // ✅ 제목에 핵심 카피 포함(카카오 우회)
    title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
    description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
    images: [
      // ✅ 텍스트가 합성된 전용 썸네일(카카오서 description 미표시 보완)
      {
        url: 'https://hoid.co.kr/og_kakao_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'HOID — 맑은 공기·편리한 청소',
      },
      // ↘ 백업 이미지(기존 PNG 유지 가능)
      {
        url: 'https://hoid.co.kr/og_image2.png',
        width: 1200,
        height: 630,
        alt: '호이드 공기청정기',
      },
    ],
    locale: 'ko_KR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
    description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
    images: ['https://hoid.co.kr/og_kakao_1200x630.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Header />
        <main className="mt-[72px] md:mt-[90px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
