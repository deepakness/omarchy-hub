import type { Metadata } from "next";
import themesData from "../../data/themes.json";

const themeCount = themesData.length;

export const metadata: Metadata = {
  title: `${themeCount} Omarchy Themes`,
  description: `Discover ${themeCount} beautiful color schemes and themes for Omarchy Linux. Customize your desktop with community-shared visual styles.`,
  openGraph: {
    title: `${themeCount} Omarchy Themes`,
    description: `Discover ${themeCount} beautiful color schemes and themes for Omarchy Linux. Customize your desktop with community-shared visual styles.`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${themeCount} Omarchy Themes`,
    description: `Discover ${themeCount} beautiful color schemes and themes for Omarchy Linux. Customize your desktop with community-shared visual styles.`,
  },
};

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
