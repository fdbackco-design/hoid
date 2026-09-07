import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

const title = "A/S 센터 | HOiD";
const description =
  "HOiD 제품 A/S와 유·무상 수리 기준을 확인하세요. 공기청정기·청소기·제습기 고객센터는 1544-9537입니다.";

export const metadata: Metadata = {
  title: "A/S 센터",
  description,
  alternates: { canonical: "/as-center" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/as-center`,
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

export default function AsCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="A/S 센터" path="/as-center" />
      {children}
    </>
  );
}
