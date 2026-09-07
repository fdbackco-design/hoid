import JsonLd from "@/components/seo/JsonLd";
import {
  AEROFUSION_PRODUCT,
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export default function HomeJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
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
        availableLanguage: ["Korean"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "070-8648-1288",
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: ["Korean"],
        name: "무빙 스마트TV A/S",
      },
    ],
    sameAs: ORGANIZATION.sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: AEROFUSION_PRODUCT.name,
    model: AEROFUSION_PRODUCT.model,
    sku: AEROFUSION_PRODUCT.sku,
    description: AEROFUSION_PRODUCT.description,
    image: AEROFUSION_PRODUCT.image,
    brand: {
      "@type": "Brand",
      name: AEROFUSION_PRODUCT.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
    category: "공기청정기",
  };

  return (
    <>
      <JsonLd id="ld-organization" data={organization} />
      <JsonLd id="ld-website" data={website} />
      <JsonLd id="ld-product" data={product} />
    </>
  );
}
