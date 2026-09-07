import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

const title = "기업·단체 대량 구매 문의 | HOiD";
const description =
  "HOiD 공기청정기와 생활가전의 기업·단체 대량 구매 및 견적을 문의하세요. 담당자 연락처와 문의 양식을 안내합니다.";

export const metadata: Metadata = {
  title: "대량 구매 문의",
  description,
  alternates: { canonical: "/bulk-purchase" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/bulk-purchase`,
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

export default function BulkPurchaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="대량 구매 문의" path="/bulk-purchase" />
      {children}
    </>
  );
}
