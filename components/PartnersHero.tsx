"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoveRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function PartnersHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".partners-hero-text",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
            );

            gsap.fromTo(
                ".partners-hero-card",
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out", delay: 1, stagger: 0.15 }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full pt-48 pb-20 px-6 md:px-12 overflow-hidden"
        >
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-signal/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto text-center" ref={contentRef}>
                <span className="partners-hero-text inline-block font-mono text-xs tracking-[0.4em] uppercase text-signal mb-8 opacity-0">
                    Growth Infrastructure
                </span>
                
                <h1 className="partners-hero-text text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[0.95] mb-10 opacity-0">
                    The Referral<br />
                    <span className="italic text-white/50 font-bold">Incentive.</span>
                </h1>
                
                <p className="partners-hero-text text-lg md:text-2xl text-metallic max-w-3xl mx-auto leading-relaxed mb-16 opacity-0">
                    Scale your network, while we scale their systems. Earn a recurring <span className="text-signal font-bold">15% commission</span> for every enterprise client you connect to the Integrate platform.
                </p>

                <div className="partners-hero-text flex flex-col md:flex-row items-center justify-center gap-12 mt-12 opacity-0">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl md:text-5xl font-serif text-white">15%</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 text-center">Recurring<br/>Revenue Share</span>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-white/10" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl md:text-5xl font-serif text-white">£4.8k</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 text-center">Avg Annual<br/>Partner Payout</span>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-white/10" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl md:text-5xl font-serif text-white">Elite</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 text-center">Full Sales<br/>Support Included</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
