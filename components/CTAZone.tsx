"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal, ShieldCheck } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CTAZone() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Background Parallax & Reveal (Slight zoom in)
            gsap.fromTo(
                ".cta-bg-img",
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

            // Staggered UI entry
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });

            // 1. Panel glows into existence
            tl.fromTo(".cta-panel",
                { y: 60, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", force3D: true }
            );

            // 2. Split text reveal for the headline
            if (textRef.current) {
                const chars = textRef.current.innerText.split("");
                textRef.current.innerHTML = "";
                chars.forEach(char => {
                    const span = document.createElement("span");
                    span.innerText = char === " " ? "\u00A0" : char;
                    span.className = "inline-block opacity-0 translate-y-4";
                    textRef.current?.appendChild(span);
                });

                tl.to(textRef.current.children, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.02,
                    duration: 0.8,
                    ease: "back.out(1.5)",
                }, "-=0.8");
            }

            // 3. Subtext and button fade in
            tl.fromTo(".cta-sub",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
                "-=0.4"
            );

            // Infinite Border Glow Sweep
            gsap.to(".border-glow", {
                rotate: 360,
                duration: 4,
                repeat: -1,
                ease: "linear",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-deep-carbon flex items-center justify-center overflow-hidden">

            {/* Background Architecture */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"
                    alt="Command Center"
                    fill
                    className="cta-bg-img object-cover object-center will-change-transform transform-gpu mix-blend-luminosity opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/80 to-[#030405]" />
            </div>

            {/* Glassmorphic Command Panel */}
            <div className="cta-panel relative z-10 w-[90%] max-w-4xl mx-auto rounded-3xl overflow-hidden p-[1px] transform-gpu">
                {/* Rotating Border Glow */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    <div className="border-glow absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#D1D5DB_100%)] opacity-30" />
                </div>

                <div className="relative z-10 w-full h-full bg-[#0a0c0e]/90 backdrop-blur-2xl rounded-[23px] px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5">

                    <div className="cta-sub flex gap-4 mb-8">
                        <div className="flex items-center gap-2 text-xs font-mono text-metallic bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <Terminal size={14} className="text-signal" />
                            <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-metallic bg-white/5 px-4 py-2 rounded-full border border-white/10 hidden md:flex">
                            <ShieldCheck size={14} className="text-signal" />
                            <span>Confidential</span>
                        </div>
                    </div>

                    <h2 ref={textRef} className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8 drop-shadow-2xl">
                        Your AI transformation starts here.
                    </h2>

                    <p className="cta-sub text-lg text-metallic/80 font-sans mb-12 max-w-xl mx-auto leading-relaxed">
                        Book a 30-minute strategy call. We’ll map out exactly which AI systems will have the highest ROI for your business — no fluff, no pressure.
                    </p>

                    <button className="cta-sub group relative px-10 py-5 bg-white text-deep-carbon rounded-full font-sans text-lg font-bold overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] border border-transparent hover:border-white/50">
                        <span className="relative z-10 flex items-center gap-3">
                            Book a Strategy Call — Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 group-hover:text-deep-carbon transition-all duration-300" />
                        </span>

                        {/* High-contrast sweep effect */}
                        <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                    </button>
                </div>
            </div>

            {/* Ambient Base Light */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-signal/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
