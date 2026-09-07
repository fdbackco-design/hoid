import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "A/S 센터",
  description:
    "HOID A/S 센터 안내. 공기청정기·청소기·제습기 1544-9537, 무빙 스마트TV 070-8648-1288. 운영시간 AM 10:00–PM 17:00.",
  alternates: { canonical: "/as-center" },
  openGraph: {
    url: `${SITE_URL}/as-center`,
    title: "A/S 센터 | HOiD",
    description:
      "HOID A/S 센터 안내. 공기청정기·청소기·제습기 1544-9537, 무빙 스마트TV 070-8648-1288.",
  },
};

export default function AsCenterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
