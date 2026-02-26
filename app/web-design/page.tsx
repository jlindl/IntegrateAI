import WebDesignHero from "@/components/WebDesignHero";
import ExplodedView from "@/components/ExplodedView";
import HorizontalGallery from "@/components/HorizontalGallery";
import AnatomyBento from "@/components/AnatomyBento";
import PortalValueEngine from "@/components/PortalValueEngine";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Web Design | Elite AI Automation Agency",
    description: "We architect high-performance digital environments that command authority.",
};

export default function WebDesignPage() {
    return (
        <main className="min-h-screen bg-[#030405]">
            <Navbar />
            <WebDesignHero />
            <ExplodedView />
            <HorizontalGallery />
            <AnatomyBento />
            <PortalValueEngine />
        </main>
    );
}
