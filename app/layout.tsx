import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: {
    template: "%s | Omarchy Hub",
    default: "Omarchy Hub - Workstation Setups, Themes, and Resources",
  },
  description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
  metadataBase: new URL("https://omarchy.deepakness.com"),
  openGraph: {
    title: "Omarchy Hub - Workstation Setups, Themes, and Resources",
    description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
    images: [
      {
        url: "/omarchy-setups.png",
        width: 1200,
        height: 630,
        alt: "Omarchy Setups - Workstation Setups, Themes, and Resources",
      },
    ],
    type: "website",
    siteName: "Omarchy Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omarchy Hub - Workstation Setups, Themes, and Resources",
    description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
    images: ["/omarchy-setups.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Umami Analytics */}
        <Script
          src="https://umami.vempus.com/script.js"
          data-website-id="5bece05e-627e-48d1-abc3-0a1100d8c220"
          strategy="afterInteractive"
        />
        
        <Header />
        {children}
        <footer className="bg-primary border-t border-secondary py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-foreground/50 text-sm font-mono">
                This is an independent community resource and is not officially affiliated with{' '}
                <a 
                  href="https://omarchy.org" 
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-foreground/70 hover:text-blue transition-colors"
                >
                  omarchy.org
                </a>
              </p>
              <p className="text-foreground/60 font-mono">
                Created by{' '}
                <a 
                  href="https://deepakness.com" 
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue hover:text-blue-hover transition-colors"
                >
                  DeepakNess
                </a>
              </p>
              <a
                href="https://github.com/deepakness/omarchy-hub"
                target="_blank"
                rel="noopener noreferrer nofollow"
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
