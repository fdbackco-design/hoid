import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "HOID 제품 배송, 주문/결제, 취소/환불, A/S 등 자주 묻는 질문을 확인하세요.",
  alternates: { canonical: "/faq" },
  openGraph: {
    url: `${SITE_URL}/faq`,
    title: "자주 묻는 질문 | HOiD",
    description:
      "HOID 제품 배송, 주문/결제, 취소/환불, A/S 등 자주 묻는 질문을 확인하세요.",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
