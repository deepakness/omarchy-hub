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
  title: "Omarchy Hub - Community Resources",
  description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
  metadataBase: new URL("https://omarchy.deepakness.com"),
  openGraph: {
    title: "Omarchy Hub - Community Resources",
    description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
    images: [
      {
        url: "/omarchy-setups.png?v=3",
        width: 1200,
        height: 630,
        alt: "Omarchy Setups - Community Collection",
      },
    ],
    type: "website",
    siteName: "Omarchy Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omarchy Hub - Community Resources",
    description: "Discover themes, setups, and resources for Omarchy Linux. Community-driven collection of tools and guides.",
    images: ["/omarchy-setups.png?v=3"],
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
        {/* Google Analytics - Load after page content for better performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PXTVKB66HW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PXTVKB66HW');
          `}
        </Script>
        
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
