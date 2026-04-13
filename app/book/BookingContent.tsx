"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BookingContentProps {
    calendarId: string;
}

export default function BookingContent({ calendarId }: BookingContentProps) {
    const searchParams = useSearchParams();
    
    // Capture pre-fill data from URL params
    const firstName = searchParams.get("firstName") || searchParams.get("name") || "";
    const lastName = searchParams.get("lastName") || "";
    const email = searchParams.get("email") || "";
    const phone = searchParams.get("phone") || "";

    // Construct the GHL Widget URL with pre-fill parameters
    const baseUrl = `https://link.msgsndr.com/widget/booking/${calendarId}`;
    const params = new URLSearchParams({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
    });
    
    const embedUrl = `${baseUrl}?${params.toString()}`;

    return (
        <section className="relative min-h-screen w-full bg-[#030405] flex items-center justify-center p-4 md:p-12 overflow-hidden selection:bg-white/20">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                    alt="Space/Technology Background"
                    fill
                    className="object-cover object-center opacity-[0.06] grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030405] via-[#030405]/95 to-[#030405]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-signal/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            {/* Navbar back link */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="text-white/30 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                    <ArrowLeft size={14} /> Exit Portal
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                {/* Visual Header */}
                <div className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
                        Strategy <span className="italic text-white/50">Session.</span>
                    </h1>
                </div>

                {/* GHL Widget Container */}
                <div className="w-full bg-[#0a0c0e]/80 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] min-h-[700px]">
                    <iframe
                        src={embedUrl}
                        style={{ width: '100%', border: 'none', minHeight: '700px' }}
                        scrolling="no"
                        id={`ghl-calendar-${calendarId}`}
                        className="ghl-embed-iframe"
                    />
                </div>
            </div>

            {/* Subtle Footer Meta */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
                <p className="font-mono text-[9px] text-white/10 uppercase tracking-[0.4em]">
                    Encrypted Pipeline &copy; {new Date().getFullYear()} Integrate
                </p>
            </div>

            <style jsx global>{`
                .ghl-embed-iframe {
                    color-scheme: dark;
                }
            `}</style>
        </section>
    );
}
