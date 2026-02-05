import type { Metadata } from "next";
import setupsData from "../../data/setups.json";
import { CollectionPageJsonLd } from "../../components/JsonLd";

const setupCount = setupsData.length;

export const metadata: Metadata = {
  title: `${setupCount} Omarchy Workstation Setups`,
  description: `Browse ${setupCount} beautiful Omarchy workstation setups. Get inspired for your own Linux desktop configuration.`,
  openGraph: {
    title: `${setupCount} Omarchy Workstation Setups`,
    description: `Browse ${setupCount} beautiful Omarchy workstation setups. Get inspired for your own Linux desktop configuration.`,
    images: [
      {
        url: "/omarchy-setups.png",
        width: 1200,
        height: 630,
        alt: `${setupCount} Omarchy Workstation Setups`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${setupCount} Omarchy Workstation Setups`,
    description: `Browse ${setupCount} beautiful Omarchy workstation setups. Get inspired for your own Linux desktop configuration.`,
    images: ["/omarchy-setups.png"],
  },
};

export default function SetupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CollectionPageJsonLd
        name={`${setupCount} Omarchy Workstation Setups`}
        description={`Browse ${setupCount} beautiful Omarchy workstation setups. Get inspired for your own Linux desktop configuration.`}
        url="https://omarchy.deepakness.com/setups"
        numberOfItems={setupCount}
      />
      {children}
    </>
  );
}

