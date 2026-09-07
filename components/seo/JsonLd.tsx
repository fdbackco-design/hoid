interface IJsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  id: string;
}

export default function JsonLd({ data, id }: IJsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
