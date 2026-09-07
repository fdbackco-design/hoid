import JsonLd from "@/components/seo/JsonLd";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName,
        url: ORGANIZATION.url,
        logo: {
          "@type": "ImageObject",
          url: ORGANIZATION.logo,
        },
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        address: {
          "@type": "PostalAddress",
          ...ORGANIZATION.address,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "1544-9537",
            contactType: "customer service",
            areaServed: "KR",
            availableLanguage: ["ko"],
          },
          {
            "@type": "ContactPoint",
            telephone: "070-8648-1288",
            contactType: "customer service",
            areaServed: "KR",
            availableLanguage: ["ko"],
            name: "무빙 스마트TV A/S",
          },
        ],
        sameAs: ORGANIZATION.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: "ko-KR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return <JsonLd id="ld-site" data={data} />;
}
