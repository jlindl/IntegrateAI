"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax
            gsap.fromTo(
                ".about-cta-bg",
                { scale: 1.15, filter: "brightness(0.3) contrast(1.2)" },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                    scale: 1,
                    filter: "brightness(0.6) contrast(1.1)",
                    ease: "none",
                }
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
            });

            // Panel reveal
            tl.fromTo(
                ".about-cta-panel",
                { y: 60, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", force3D: true }
            );

            // Word reveal
            tl.to(".about-cta-word", {
                y: 0,
                opacity: 1,
                stagger: 0.07,
                duration: 0.9,
                ease: "power3.out",
            }, "-=0.7");

            // Sub elements
            tl.fromTo(
                ".about-cta-sub",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
                "-=0.4"
            );

            // Rotating border glow
            gsap.to(".about-border-glow", {
                rotate: 360,
                duration: 4,
                repeat: -1,
                ease: "linear",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const headline = "Ready to integrate AI into your DNA?";
    const words = headline.split(" ");

    return (
        <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-deep-carbon flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"
                    alt="Command Center"
                    fill
                    className="about-cta-bg object-cover object-center will-change-transform transform-gpu mix-blend-luminosity opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/80 to-[#030405]" />
            </div>

            {/* Glassmorphic Panel */}
            <div className="about-cta-panel relative z-10 w-[90%] max-w-4xl mx-auto rounded-3xl overflow-hidden p-[1px] transform-gpu">
                {/* Rotating Border Glow */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    <div className="about-border-glow absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#D1D5DB_100%)] opacity-30" />
                </div>

                <div className="relative z-10 w-full h-full bg-[#0a0c0e]/90 backdrop-blur-2xl rounded-[23px] px-8 py-16 md:px-20 md:py-24 flex flex-col items-center text-center shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5">
                    {/* Eyebrow */}
                    <p className="about-cta-sub text-xs tracking-[0.2em] uppercase font-mono text-signal/70 mb-6">
                        Let&apos;s Build Together
                    </p>

                    {/* Headline — word split */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-8 drop-shadow-2xl flex flex-wrap justify-center gap-x-[0.25em]">
                        {words.map((word, i) => (
                            <span key={i} className="about-cta-word inline-block opacity-0 translate-y-6">
                                {word}
                            </span>
                        ))}
                    </h2>

                    {/* Subtext */}
                    <p className="about-cta-sub text-base md:text-lg text-metallic/70 font-sans mb-12 max-w-2xl mx-auto leading-relaxed">
                        Book a 30-minute strategy call. We&apos;ll map out exactly which AI systems will have the highest ROI for your business — no fluff, no pressure.
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        className="about-cta-sub group relative px-10 py-5 bg-white text-deep-carbon rounded-full font-sans text-base font-bold overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] border border-transparent hover:border-white/50 mb-10 inline-flex items-center justify-center"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Book a Strategy Call — Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-all duration-300" />
                        </span>
                        <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                    </Link>

                    {/* Trust badges */}
                    <div className="about-cta-sub flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs font-mono text-metallic/40">
                            <Terminal size={12} className="text-signal/50" />
                            <span>Available for new projects</span>
                        </div>
                        <span className="w-px h-3 bg-white/10" />
                        <div className="flex items-center gap-2 text-xs font-mono text-metallic/40">
                            <ShieldCheck size={12} className="text-signal/50" />
                            <span>Confidential by default</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-signal/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
