import type { Metadata } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";

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

export const metadata: Metadata = {
  title: "Integrate Platform",
  description: "Enterprise AI Automation Platform.",
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
      </body>
    </html>
  );
}
