import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "대량 구매 문의",
  description:
    "HOID 대량 구매·기업·단체 견적 문의. 양식 작성으로 간편하게 견적을 받아보세요.",
  alternates: { canonical: "/bulk-purchase" },
  openGraph: {
    url: `${SITE_URL}/bulk-purchase`,
    title: "대량 구매 문의 | HOiD",
    description:
      "HOID 대량 구매·기업·단체 견적 문의. 양식 작성으로 간편하게 견적을 받아보세요.",
  },
};

export default function BulkPurchaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
