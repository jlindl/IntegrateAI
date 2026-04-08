import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CTAZone from "../../components/CTAZone";
import BlogSection from "../../components/BlogSection";
import React from "react";

export const metadata = {
  title: "Insights | Integrate AI Automation",
  description: "Engineering insights, case studies, and strategic thought leadership on elite B2B AI automation architectures.",
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-deep-carbon text-signal selection:bg-signal/30 selection:text-signal font-sans overflow-clip flex flex-col">
      <Navbar />
      
      {/* Spacer for fixed Navbar */}
      <div className="pt-32 flex-grow flex flex-col">
        <BlogSection />
      </div>

      <div className="relative z-10 bg-deep-carbon">
        <CTAZone />
        <Footer />
      </div>
    </main>
  );
}
