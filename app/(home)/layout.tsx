import type { Metadata } from "next";
import { preload } from "react-dom";
import HomeJsonLd from "@/components/seo/HomeJsonLd";
import "@/components/aerofusion/style.css";
import "@/components/aerofusion/_explode-v4.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "ko_KR",
    title: DEFAULT_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_OG_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  preload("/frames/hero/h_001.jpg", { as: "image", fetchPriority: "high" });

  return (
    <>
      <HomeJsonLd />
      {children}
    </>
  );
}
