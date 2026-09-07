import JsonLd from "@/components/seo/JsonLd";
import {
  AEROFUSION_PRODUCT,
  SITE_URL,
} from "@/lib/seo";

export default function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: AEROFUSION_PRODUCT.name,
        description: AEROFUSION_PRODUCT.description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#aerofusion` },
      },
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#aerofusion`,
        name: AEROFUSION_PRODUCT.name,
        model: AEROFUSION_PRODUCT.model,
        sku: AEROFUSION_PRODUCT.sku,
        description: AEROFUSION_PRODUCT.description,
        image: AEROFUSION_PRODUCT.image,
        url: `${SITE_URL}/`,
        brand: {
          "@type": "Brand",
          name: AEROFUSION_PRODUCT.brand,
        },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        category: "공기청정 냉온풍기",
      },
    ],
  };

  return <JsonLd id="ld-home" data={data} />;
}
