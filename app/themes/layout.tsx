import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omarchy Themes - Color Schemes & Styles",
  description: "Discover beautiful color schemes and themes for Omarchy Linux. Customize your desktop with community-shared visual styles.",
};

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
