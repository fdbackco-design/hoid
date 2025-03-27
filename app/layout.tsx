import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'HOID',
  description: 'HOID 공식 홈페이지입니다. A/S 센터, 자주 묻는 질문, 대량 구매 문의를 확인하실 수 있습니다.',
  other: {
    'naver-site-verification': 'ef8eea773f3a0a223a19f8e1adcae83cececeb97',
  },
  openGraph: {
    type: 'website',
    title: 'HOID - 공식 홈페이지',
    description: 'HOID 공식 홈페이지입니다. A/S 센터, 자주 묻는 질문, 대량 구매 문의를 확인하실 수 있습니다.',
    url: 'https://hoid.kr',
    siteName: 'HOID',
    images: [
      {
        url: 'https://hoid.kr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HOID',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOID - 공식 홈페이지',
    description: 'HOID 공식 홈페이지입니다. A/S 센터, 자주 묻는 질문, 대량 구매 문의를 확인하실 수 있습니다.',
    images: ['https://hoid.kr/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
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
