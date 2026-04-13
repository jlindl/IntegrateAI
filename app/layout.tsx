import type { Metadata } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const SITE_URL = "https://integrate-tech.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Integrate | Enterprise AI Automation & Systems Architecture",
    template: "%s | Integrate"
  },
  description: "Bespoke AI systems for high-growth B2B. We design and deploy strategic automation that eliminates operational bottlenecks.",
  keywords: ["AI Automation", "Enterprise AI", "B2B Automation", "Workflow Optimization", "AI Systems Architecture"],
  authors: [{ name: "Integrate Team" }],
  creator: "Integrate",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Integrate",
    title: "Integrate | Enterprise AI Automation",
    description: "Design and deploy strategic AI automation tailored for elite enterprise growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Integrate Platform - AI Systems Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrate | Enterprise AI Automation",
    description: "Strategic AI partner for high-growth B2B. Automating revenue operations at scale.",
    images: ["/og-image.png"],
    creator: "@integrateai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} ${ibmPlex.variable} antialiased relative`}
      >
        <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Integrate",
              "url": "https://integrate-tech.co.uk",
              "logo": "https://integrate-tech.co.uk/logo.png",
              "description": "Enterprise AI Automation & Systems Architecture",
              "sameAs": [
                "https://x.com/integrate-tech",
                "https://linkedin.com/company/integrate-tech"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Integrate",
              "url": "https://integrate-tech.co.uk",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://integrate-tech.co.uk/insights?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
