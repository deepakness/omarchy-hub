import type { Metadata } from "next";
import resourcesData from "../../data/resources.json";
import { CollectionPageJsonLd } from "../../components/JsonLd";

const resourceCount = resourcesData.length;

export const metadata: Metadata = {
  title: `${resourceCount} Omarchy Resources - Guides, Documentation, and More`,
  description: `Find ${resourceCount} helpful guides, tutorials, and documentation for Omarchy Linux. Community-curated learning resources, tools, and more.`,
  openGraph: {
    title: `${resourceCount} Omarchy Resources - Guides, Documentation, and More`,
    description: `Find ${resourceCount} helpful guides, tutorials, and documentation for Omarchy Linux. Community-curated learning resources, tools, and more.`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${resourceCount} Omarchy Resources - Guides, Documentation, and More`,
    description: `Find ${resourceCount} helpful guides, tutorials, and documentation for Omarchy Linux. Community-curated learning resources, tools, and more.`,
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CollectionPageJsonLd
        name={`${resourceCount} Omarchy Resources`}
        description={`Find ${resourceCount} helpful guides, tutorials, and documentation for Omarchy Linux.`}
        url="https://omarchy.deepakness.com/resources"
        numberOfItems={resourceCount}
      />
      {children}
    </>
  );
}

