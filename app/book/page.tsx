"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

function BookingContent() {
    const searchParams = useSearchParams();
    const contactId = searchParams.get("contactId") || "";
    const name = searchParams.get("name") || "Guest";

    return (
        <section className="relative min-h-screen w-full bg-[#030405] flex items-center justify-center p-6 md:p-12 overflow-hidden selection:bg-white/20">
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

            {/* Back link */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="text-white/30 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                    <ArrowLeft size={14} /> Go back
                </Link>
            </div>

            <div className="relative z-10 w-full flex justify-center">
                <BookingCalendar contactId={contactId} contactName={name} />
            </div>

            {/* Subtle Footer Meta */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
                <p className="font-mono text-[9px] text-white/10 uppercase tracking-[0.4em]">
                    Digital Infrastructure &copy; {new Date().getFullYear()} Integrate
                </p>
            </div>
        </section>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#030405] flex items-center justify-center font-mono text-xs text-white/20 tracking-widest uppercase animate-pulse">
                Loading...
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}
