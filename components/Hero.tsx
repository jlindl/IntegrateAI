"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance for text elements (fade + blur resolve)
            gsap.fromTo(
                ".hero-text",
                { y: 30, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.4,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );

            // Background slow drift
            gsap.fromTo(
                ".hero-bg",
                { scale: 1.05, rotation: 0.5 },
                { scale: 1, rotation: 0, duration: 25, ease: "none", repeat: -1, yoyo: true }
            );

            // Subtle light sweep animation
            gsap.to(".light-sweep", {
                x: "200%",
                duration: 4,
                ease: "power2.inOut",
                repeat: -1,
                repeatDelay: 5,
            });

            // SCROLL EFFECTS
            // 1. Background slow parallax (moves down slightly as user scrolls down)
            gsap.to(".hero-bg-wrapper", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: "20%",
                ease: "none",
            });

            // 2. Content wrapper fades, blurs, and slides up to create depth
            gsap.to(".hero-content-wrapper", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -150,
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                ease: "none",
                force3D: true,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100dvh] flex items-center justify-start overflow-hidden bg-[#030405]"
        >
            <div className="hero-bg-wrapper absolute inset-0 z-0 opacity-70 mix-blend-screen overflow-hidden will-change-transform transform-gpu">
                {/* Abstract geometric metallic environment */}
                <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Abstract metallic environment"
                    fill
                    className="hero-bg object-cover object-center opacity-30 mix-blend-screen grayscale contrast-125"
                    priority
                />
                {/* Dark Vignette Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030405] via-transparent to-transparent" />

                {/* Light Sweep Layer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15] mix-blend-overlay">
                    <div className="light-sweep absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-30deg]" />
                </div>
            </div>

            <div className="hero-content-wrapper relative z-10 w-full max-w-[95rem] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col items-start will-change-transform transform-gpu">
                <div className="flex flex-col items-start">
                    {/* Eyebrow */}
                    <div className="hero-text inline-flex items-center gap-3 px-4 py-2 border-l-2 border-signal bg-gradient-to-r from-[#1a1c23]/60 to-transparent backdrop-blur-md mb-8">
                        <span className="w-1.5 h-1.5 bg-signal shadow-[0_0_8px_rgba(255,255,255,0.8)] skew-x-[-15deg] animate-pulse" />
                        <span className="font-mono text-metallic text-[10px] uppercase tracking-[0.25em] font-medium">
                            Elite AI Automation Agency
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-signal leading-tight lg:leading-[1.1] tracking-tight mb-8 max-w-5xl">
                        The strategic AI partner<br />
                        <span className="metallic-gradient-text italic font-bold">for high-growth B2B.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="hero-text text-lg md:text-xl lg:text-2xl text-metallic font-sans max-w-2xl leading-relaxed tracking-wide mb-12 opacity-90">
                        We design, deploy, and manage bespoke AI systems — automating revenue operations so your team can focus on what only humans can do.
                    </p>

                    {/* CTAs */}
                    <div className="hero-text flex flex-col sm:flex-row items-center gap-6">
                        <button className="group relative px-10 py-5 bg-signal text-[#030405] rounded-sm font-sans text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] skew-x-[-5deg]">
                            <span className="relative z-10 flex items-center gap-3 skew-x-[5deg]">
                                Book a Strategy Call
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="group-hover:translate-x-1 transition-transform">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:translate-x-full transition-transform duration-[600ms] ease-in-out" />
                        </button>

                        <button className="group px-8 py-5 bg-transparent text-signal rounded-sm border border-metallic/30 font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#0a0c0e] hover:border-signal/50 skew-x-[-5deg]">
                            <span className="inline-block skew-x-[5deg]">See What We Build →</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
