import Navbar from "../../components/Navbar";
import CaseStudies from "../../components/CaseStudies";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies — Integrate",
    description:
        "Real workflows. Real automations. Exact tools, logic, and ROI documented step by step.",
};

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-[#030405] text-white font-sans overflow-clip">
            <Navbar />
            <CaseStudies />
            <Footer />
        </main>
    );
}
