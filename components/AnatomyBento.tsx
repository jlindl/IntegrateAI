"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TECHNOLOGIES = [
    { id: "01", name: "Next.js 14", desc: "App Router & SSR for zero-latency global delivery." },
    { id: "02", name: "React Server Components", desc: "Moving the heavy lifting to the edge. Zero-bundle size UI." },
    { id: "03", name: "GSAP Premium", desc: "Cinematic ScrollTriggers & physics-based kinetic interactions." },
    { id: "04", name: "Supabase Edge", desc: "50ms global latency distributed PostgreSQL architecture." },
    { id: "05", name: "Tailwind CSS", desc: "Utility-first precision styling built for maintainability." },
    { id: "06", name: "Vercel Infrastructure", desc: "Global Edge Network deployment for infinite scale." },
];

export default function AnatomyBento() {
    const containerRef = useRef<HTMLElement>(null);
    const shutterTopRef = useRef<HTMLDivElement>(null);
    const shutterBottomRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // -------------------------------------------------------------
            // 1. IN: THE SHUTTER SNAP (From Horizontal Gallery)
            // -------------------------------------------------------------

            // Set initial state for shutters (wide open)
            gsap.set(shutterTopRef.current, { yPercent: -100 });
            gsap.set(shutterBottomRef.current, { yPercent: 100 });

            const shutterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%", // Start closing when section enters viewport
                    end: "top 20%",   // Fully closed snaps when near top
                    scrub: 1,         // Tie shutter close to scroll
                }
            });

            // Shutters slam shut
            shutterTl.to(shutterTopRef.current, { yPercent: 0, ease: "power2.in" }, 0)
                .to(shutterBottomRef.current, { yPercent: 0, ease: "power2.in" }, 0);

            // Trigger a massive camera shake the instant they snap shut
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 20%",
                onEnter: () => {
                    gsap.fromTo("body",
                        { x: -10, y: 10 },
                        { x: 0, y: 0, duration: 0.4, clearProps: "all", ease: "rough({ template: power3.out, strength: 3, points: 20, taper: 'out', randomize: true, clamp: false })" }
                    );
                },
                onEnterBack: () => {
                    gsap.fromTo("body",
                        { x: -10, y: 10 },
                        { x: 0, y: 0, duration: 0.4, clearProps: "all", ease: "rough({ template: power3.out, strength: 3, points: 20, taper: 'out', randomize: true, clamp: false })" }
                    );
                }
            });


            // -------------------------------------------------------------
            // 2. INTERNAL: THE BRUTALIST LIST REVEAL
            // -------------------------------------------------------------
            const items = gsap.utils.toArray(".anatomy-item");
            items.forEach((item: unknown) => {
                const el = item as Element;
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            });

            // -------------------------------------------------------------
            // 3. OUT: THE STICKY OVERLAP (Pinning the section)
            // -------------------------------------------------------------

            // We pin the entire container once the user has scrolled to the bottom of the list.
            // By setting pinSpacing to false, the next section will seamlessly slide up and cover it.
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "bottom bottom", // Wait until the user has fully scrolled through the list
                end: "+=150%", // Keep it pinned while the next section (ValueEngine) overlaps it
                pin: true,
                pinSpacing: false,
                // We'll also fade it out slightly as it gets covered for depth
                animation: gsap.to(containerRef.current, { opacity: 0.2, filter: "blur(4px)", ease: "none" }),
                scrub: true
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-transparent z-30">

            {/* 
                THE SHUTTER OVERLAYS 
                These are absolute positioned and fixed to the section to act as the wipe masks
            */}
            <div ref={shutterTopRef} className="absolute top-0 left-0 w-full h-1/2 bg-[#030405] z-0 will-change-transform" />
            <div ref={shutterBottomRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-[#030405] z-0 will-change-transform" />


            {/* Content Container - Needs to be relative to sit above the shutters but below the text container we pin */}
            <div className="relative z-10 w-full bg-[#030405] pt-[30vh] pb-48 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Left Column - Typography Crush Container */}
                <div className="lg:col-span-5 relative">
                    {/* Sticky header that stays with the user while they scroll the long list */}
                    <div ref={textContainerRef} className="sticky top-32 pt-[10vh]">
                        <p className="font-mono text-signal text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                            <span className="w-1 h-1 bg-signal"></span>
                            Technical Anatomy
                        </p>

                        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white tracking-tighter leading-[0.9] mb-8 whitespace-nowrap">
                            Absolute <br />
                            Control.
                        </h2>

                        <p className="text-metallic/60 font-sans text-lg max-w-sm leading-relaxed mb-12">
                            We don&apos;t use templates. We don&apos;t use page builders. We engineer raw code for absolute control over performance, security, and aesthetics.
                        </p>

                        <div className="inline-flex items-center gap-4 border border-signal/20 bg-signal/5 px-6 py-4 rounded-full">
                            <Zap className="text-signal" size={20} />
                            <span className="font-mono text-xs text-white uppercase tracking-widest">100/100 Lighthouse</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Brutalist List (Scrolls normally beneath the pinned text) */}
                <div className="lg:col-span-7 flex flex-col pt-12 lg:pt-[20vh] relative z-20">
                    {TECHNOLOGIES.map((tech) => (
                        <div
                            key={tech.id}
                            className="anatomy-item group border-t border-white/5 py-12 flex flex-col md:flex-row gap-6 md:gap-12 transition-all hover:border-signal/50"
                        >
                            <div className="font-mono text-sm text-white/30 tracking-widest w-12 shrink-0 group-hover:text-signal transition-colors">
                                {tech.id}
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                    {tech.name}
                                </h3>
                                <p className="text-metallic/70 text-base leading-relaxed max-w-md">
                                    {tech.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Closing bottom border */}
                    <div className="border-t border-white/5 anatomy-item opacity-0"></div>
                </div>

            </div>
        </section>
    );
}
