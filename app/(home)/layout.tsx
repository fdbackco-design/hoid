import type { Metadata } from "next";
import HomeJsonLd from "@/components/seo/HomeJsonLd";
import "@/components/aerofusion/style.css";
import "@/components/aerofusion/_explode-v4.css";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: `${SITE_URL}/`,
    title: DEFAULT_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeJsonLd />
      {children}
    </>
  );
}
