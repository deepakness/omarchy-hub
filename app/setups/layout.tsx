import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omarchy Workstation Setups - Hardware Configurations",
  description: "Browse beautiful Omarchy workstation setups shared by the community. Get inspired for your own Linux desktop configuration.",
  openGraph: {
    title: "Omarchy Workstation Setups - Hardware Configurations",
    description: "Browse beautiful Omarchy workstation setups shared by the community. Get inspired for your own Linux desktop configuration.",
    images: [
      {
        url: "/omarchy-setups.png?v=2",
        width: 1200,
        height: 630,
        alt: "Omarchy Workstation Setups - Community Hardware Configurations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omarchy Workstation Setups - Hardware Configurations",
    description: "Browse beautiful Omarchy workstation setups shared by the community. Get inspired for your own Linux desktop configuration.",
    images: ["/omarchy-setups.png?v=2"],
  },
};

export default function SetupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
