import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omarchy Resources - Guides & Documentation",
  description: "Find helpful guides, tutorials, and documentation for Omarchy Linux. Community-curated learning resources and tools.",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
