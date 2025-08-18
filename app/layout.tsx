// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://hoid.co.kr'),
  title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
  description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  other: {
    'naver-site-verification': 'ef8eea773f3a0a223a19f8e1adcae83cececeb97',
  },
  openGraph: {
    type: 'website',
    // ✅ 스크랩 대상 URL을 고정해 URL 식별 문제 방지
    url: 'https://hoid.co.kr/',
    siteName: 'HOID',
    title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
    description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
    images: [
      {
        // ✅ 절대경로 + 정적 파일 (public/og-image2.jpg 권장)
        url: 'https://hoid.co.kr/og-image2.png',
        width: 1200,
        height: 630,
        alt: '호이드 공기청정기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOID 공식몰 | 기술로 완성한 클린 라이프',
    description: '맑은 공기, 편리한 청소. HOID가 만드는 프리미엄 생활환경',
    images: ['https://hoid.co.kr/og-image2.png'],
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
