type JsonLdType = 
  | 'WebSite' 
  | 'Organization' 
  | 'CollectionPage';

interface JsonLdProps {
  type: JsonLdType;
  data: Record<string, unknown>;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Pre-configured schemas for common use cases
export function WebSiteJsonLd() {
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: 'Omarchy Hub',
        url: 'https://omarchy.deepakness.com',
        description: 'Community hub for Omarchy Linux themes, setups, and resources. Discover beautiful desktop configurations, color schemes, and helpful guides.',
        publisher: {
          '@type': 'Organization',
          name: 'Omarchy Hub',
          url: 'https://omarchy.deepakness.com',
        },
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      type="Organization"
      data={{
        name: 'Omarchy Hub',
        url: 'https://omarchy.deepakness.com',
        logo: 'https://omarchy.deepakness.com/apple-touch-icon.png',
        sameAs: [
          'https://github.com/deepakness/omarchy-hub',
        ],
      }}
    />
  );
}

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}

export function CollectionPageJsonLd({ 
  name, 
  description, 
  url, 
  numberOfItems 
}: CollectionPageJsonLdProps) {
  return (
    <JsonLd
      type="CollectionPage"
      data={{
        name,
        description,
        url,
        numberOfItems,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Omarchy Hub',
          url: 'https://omarchy.deepakness.com',
        },
      }}
    />
  );
}
