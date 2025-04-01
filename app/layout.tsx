import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'

export const metadata: Metadata = {
  title: '호이드 공기청정기 - HOID 공식 홈페이지 | 맑은 공기의 시작',
  description: '호이드 공기청정기로 집안 공기를 맑게! A/S 센터, 자주 묻는 질문, 대량 구매 문의는 공식 홈페이지에서 확인하세요.',
  other: {
    'naver-site-verification': 'ef8eea773f3a0a223a19f8e1adcae83cececeb97',
  },
  openGraph: {
    type: 'website',
    title: '호이드 공기청정기 - HOID 공식 홈페이지',
    description: '프리미엄 공기청정기, 호이드! A/S 센터, 자주 묻는 질문, 대량 구매 문의를 공식 홈페이지에서 확인하세요.',
    url: 'https://hoid.co.kr',
    siteName: 'HOID',
    images: [
      {
        url: 'https://hoid.co.kr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '호이드 공기청정기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '호이드 공기청정기 - HOID 공식 홈페이지',
    description: '프리미엄 공기청정기, 호이드! 다양한 서비스 정보를 확인하세요.',
    images: ['https://hoid.co.kr/og-image.jpg'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <Head>
        <meta name="keywords" content="호이드, 공기청정기, 미세먼지, 가전제품, 실내공기, 호이드 공기청정기" />
      </Head>
      <body className="font-pretendard">
        <Header />
        <main className="mt-[90px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
