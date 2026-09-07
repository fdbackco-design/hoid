import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

interface BreadcrumbJsonLdProps {
  name: string;
  path: `/${string}`;
}

export default function BreadcrumbJsonLd({ name, path }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return <JsonLd id={`ld-breadcrumb-${path.slice(1)}`} data={data} />;
}
