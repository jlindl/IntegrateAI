import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersHero from "@/components/PartnersHero";
import PartnerTiers from "@/components/PartnerTiers";
import PartnerForm from "@/components/PartnerForm";

export const metadata: Metadata = {
    title: "Partners & Referrals — Integrate",
    description: "Scale your clients, while we scale their systems. Join the Integrate Pioneer Network for high-end AI automation partnerships.",
};

export default function PartnersPage() {
    return (
        <main className="min-h-screen bg-[#030405] text-white font-sans overflow-clip">
            <Navbar />
            <PartnersHero />
            <PartnerTiers />
            <div className="py-24">
                <PartnerForm />
            </div>
            <Footer />
        </main>
    );
}
