import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omarchy Hub - Resource Library for Omarchy Linux",
  description: "Discover tools, themes, setups, and resources for Omarchy - the opinionated Arch + Hyprland setup by DHH.",
  metadataBase: new URL("https://omarchy.deepakness.com"),
  openGraph: {
    title: "Omarchy Hub - Resource Library for Omarchy Linux",
    description: "Discover tools, themes, setups, and resources for Omarchy - the opinionated Arch + Hyprland setup by DHH.",
    images: [
      {
        url: "/omarchy-og.png",
        width: 1200,
        height: 630,
        alt: "Omarchy Hub - Resource Library for Omarchy Linux",
      },
    ],
    type: "website",
    siteName: "Omarchy Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omarchy Hub - Resource Library for Omarchy Linux",
    description: "Discover tools, themes, setups, and resources for Omarchy - the opinionated Arch + Hyprland setup by DHH.",
    images: ["/omarchy-og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
