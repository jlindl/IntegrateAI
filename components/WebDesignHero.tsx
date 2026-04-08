"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, LayoutDashboard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WebDesignHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // 1. Initial background scale down and un-blur
            tl.fromTo(
                ".hero-bg",
                { scale: 1.15, filter: "brightness(0.2) contrast(1.2) blur(10px)" },
                {
                    scale: 1,
                    filter: "brightness(0.6) contrast(1.1) blur(0px)",
                    duration: 2.5,
                }
            );

            // 2. Decorative accent lines reveal
            tl.fromTo(
                ".accent-line",
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.2 },
                "-=1.5"
            );

            // 3. Staggered cinematic text reveal (Line by Line / Word by Word)
            tl.to(".hero-word", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1.4,
                ease: "power4.out",
            }, "-=1.8");

            // 4. Fade in subtext and UI elements
            tl.fromTo(
                ".fade-up-element",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
                "-=1.2"
            );

            // --- NEW: Sticky Scroll Animation ---
            // As the user scrolls down, pin the container and fade/scale the content into the background
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=100%",
                    scrub: 1.5,
                    pin: true,
                    pinSpacing: false,
                },
                scale: 0.9,
                opacity: 0,
                filter: "blur(15px)",
                ease: "power2.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#030405] flex items-center overflow-hidden">

            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/image.png"
                    alt="Abstract Web Design"
                    fill
                    className="hero-bg object-cover object-[85%_50%] origin-center mix-blend-luminosity grayscale opacity-50 pointer-events-none"
                    priority
                />
                {/* Complex gradients to focus the left side */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#030405] via-[#030405]/95 to-transparent w-full z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-[#030405]/40 z-[2]" />
            </div>

            {/* Left-Aligned Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16">

                <div className="max-w-3xl">
                    {/* Top Accent & Label */}
                    <div className="fade-up-element flex items-center gap-4 mb-8">
                        <div className="accent-line h-px w-12 bg-signal origin-left" />
                        <span className="font-mono text-[10px] text-metallic uppercase tracking-[0.3em]">
                            Digital Architecture Studio
                        </span>
                    </div>

                    {/* Highly Cinematic Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white leading-[1.15] tracking-tight mb-10 drop-shadow-2xl flex flex-col gap-2 overflow-visible">
                        <div className="flex flex-wrap gap-x-6 overflow-visible">
                            <span className="hero-word block opacity-0 translate-y-8 pb-2">Engineering</span>
                            <span className="hero-word block opacity-0 translate-y-8 pb-2">your</span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 overflow-visible">
                            <span className="hero-word block opacity-0 translate-y-8 metallic-gradient-text italic font-bold pb-2 pr-6">digital</span>
                            <span className="hero-word block opacity-0 translate-y-8 metallic-gradient-text italic font-bold pb-2 pr-6">presence.</span>
                        </div>
                    </h1>

                    {/* Subtext */}
                    <p className="fade-up-element text-lg md:text-xl text-metallic/90 font-sans max-w-xl leading-relaxed mb-12">
                        We don&apos;t just design websites. We architect high-performance digital environments that command authority, convert traffic, and scale with your operations.
                    </p>

                    {/* Interactive UI Block */}
                    <div className="fade-up-element flex flex-col sm:flex-row items-center gap-6">
                        <Link href="/contact" className="group relative px-10 py-5 bg-signal text-[#030405] rounded-sm font-sans text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] skew-x-[-5deg] w-full sm:w-auto text-center flex justify-center">
                            <span className="relative z-10 flex items-center justify-center gap-3 skew-x-[5deg]">
                                Start a Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 -translate-x-[150%] skew-x-[20deg] bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-[800ms] ease-in-out" />
                        </Link>

                        <div className="flex gap-4 opacity-70">
                            <div className="flex items-center gap-2 font-mono text-xs text-metallic bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                                <LayoutDashboard size={14} className="text-signal" />
                                UI/UX Design
                            </div>
                            <div className="flex items-center gap-2 font-mono text-xs text-metallic bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md hidden sm:flex">
                                <Code size={14} className="text-signal" />
                                React/Next.js
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Accent Decorator */}
            <div className="absolute bottom-12 left-6 md:left-12 fade-up-element flex gap-2">
                <div className="w-1.5 h-1.5 bg-signal opacity-100 skew-x-[-15deg]"></div>
                <div className="w-1.5 h-1.5 bg-signal opacity-50 skew-x-[-15deg]"></div>
                <div className="w-1.5 h-1.5 bg-signal opacity-20 skew-x-[-15deg]"></div>
            </div>

        </section>
    );
}
