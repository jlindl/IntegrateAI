import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesCarousel from "../components/ServicesCarousel";
import ValueEngine from "../components/ValueEngine";
import Process from "../components/Process";
import TrustLayer from "../components/TrustLayer";
import CTAZone from "../components/CTAZone";
import Footer from "../components/Footer";
import SpecialtiesArchive from "../components/SpecialtiesArchive";

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-carbon text-signal selection:bg-signal/30 selection:text-signal font-sans overflow-clip">
      <Navbar />
      <Hero />
      <ServicesCarousel />
      <SpecialtiesArchive />
      <ValueEngine />
      <TrustLayer />
      <Process />
      <CTAZone />
      <Footer />
    </main>
  );
}

