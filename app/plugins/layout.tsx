import type { Metadata } from "next";
import pluginsData from "../../data/plugins.json";
import { CollectionPageJsonLd } from "../../components/JsonLd";

const pluginCount = pluginsData.length;

export const metadata: Metadata = {
  title: `${pluginCount} Omarchy Plugins`,
  description: `Discover ${pluginCount} hand-picked shell plugins for Omarchy 4 (Quattro). Bar widgets, panels and overlays, each one installable with a single command.`,
  openGraph: {
    title: `${pluginCount} Omarchy Plugins`,
    description: `Discover ${pluginCount} hand-picked shell plugins for Omarchy 4 (Quattro). Bar widgets, panels and overlays, each one installable with a single command.`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${pluginCount} Omarchy Plugins`,
    description: `Discover ${pluginCount} hand-picked shell plugins for Omarchy 4 (Quattro). Bar widgets, panels and overlays, each one installable with a single command.`,
  },
};

export default function PluginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CollectionPageJsonLd
        name={`${pluginCount} Omarchy Plugins`}
        description={`Discover ${pluginCount} hand-picked shell plugins for Omarchy 4 (Quattro).`}
        url="https://omarchy.deepakness.com/plugins"
        numberOfItems={pluginCount}
      />
      {children}
    </>
  );
}
