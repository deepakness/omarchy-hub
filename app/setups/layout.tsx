import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omarchy Setups - Hardware Configurations",
  description: "Browse beautiful Omarchy workstation setups shared by the community. Get inspired for your own Linux desktop configuration.",
};

export default function SetupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
