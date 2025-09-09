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
  description: "Discover tools, themes, setups, and resources for Omarchy Linux - the opinionated Arch + Hyprland setup.",
  metadataBase: new URL("https://omarchy.deepakness.com"),
  openGraph: {
    title: "Omarchy Hub - Resource Library for Omarchy Linux",
    description: "Discover tools, themes, setups, and resources for Omarchy Linux - the opinionated Arch + Hyprland setup.",
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
    description: "Discover tools, themes, setups, and resources for Omarchy Linux - the opinionated Arch + Hyprland setup.",
    images: ["/omarchy-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <footer className="bg-primary border-t border-secondary py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-foreground/60 font-mono">
                Created by{' '}
                <a 
                  href="https://deepakness.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue hover:text-blue-hover transition-colors"
                >
                  DeepakNess
                </a>
              </p>
              <a
                href="https://github.com/deepakness/omarchy-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-blue transition-colors font-mono"
              >
                {/* Using text instead of icon to avoid extra imports here */}
                View on GitHub
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
