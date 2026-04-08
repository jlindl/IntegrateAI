import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutMission from "@/components/AboutMission";
import AboutTimeline from "@/components/AboutTimeline";
import AboutValues from "@/components/AboutValues";
import AboutSocials from "@/components/AboutSocials";
import AboutCTA from "@/components/AboutCTA";

export const metadata: Metadata = {
    title: "About — Integrate",
    description: "The strategic partners building the future of AI automation. Meet the team, explore our timeline, and understand our obsession with precision.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#030405] text-white font-sans overflow-clip">
            <Navbar />
            <AboutHero />
            <AboutMission />
            <AboutTimeline />
            <AboutValues />
            <AboutSocials />
            <AboutCTA />
            <Footer />
        </main>
    );
}
