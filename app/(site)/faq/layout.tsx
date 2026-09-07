import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

const title = "자주 묻는 질문 | HOiD";
const description =
  "HOiD 제품 배송, 주문·결제, 취소·환불, 사용 방법과 A/S에 관한 자주 묻는 질문과 답변을 확인하세요.";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    siteName: SITE_NAME,
    locale: "ko_KR",
    title,
    description,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SOCIAL_IMAGE.url],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="자주 묻는 질문" path="/faq" />
      {children}
    </>
  );
}
