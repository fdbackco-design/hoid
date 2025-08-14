// app/layout.tsx (또는 app/[segment]/layout.tsx)
import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '호이드 공식몰 - HOID 공식 홈페이지 | 맑은 공기의 시작',
  description: '호이드 공기청정기로 집안 공기를 맑게! A/S 센터, 자주 묻는 질문, 대량 구매 문의는 공식 홈페이지에서 확인하세요.',
  other: {
    'naver-site-verification': 'ef8eea773f3a0a223a19f8e1adcae83cececeb97',
  },
  openGraph: {
    type: 'website',
    // ✅ 카카오톡에 보일 링크 이름(제목)
    title: 'HOID 공식몰 | 맑은 공기의 시작',   // ← 원하는 문구로 변경
    description: 'HOID 3IN1 프리미엄 공기청정기',
    url: 'https://hoid.co.kr',
    siteName: 'HOID',
    images: [
      {
        url: 'https://hoid.co.kr/og-image.png', // 절대경로 권장
        width: 1200,
        height: 630,
        alt: '호이드 공기청정기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOID 공식몰 | 맑은 공기의 시작',     // 트위터/일부 클라이언트 대비
    description: 'HOID 3IN1 프리미엄 공기청정기',
    images: ['https://hoid.co.kr/og-image.png'],
  },
  // ⛔️ 카카오 전용 메타는 없습니다. 아래 섹션은 제거하세요.
  // Kakao: { ... }  ← 삭제
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Header />
        <main className="mt-[72px] md:mt-[90px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
