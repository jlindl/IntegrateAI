"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance for text elements (fade + blur resolve)
            gsap.fromTo(
                ".about-hero-text",
                { y: 40, opacity: 0, filter: "blur(12px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.3,
                }
            );

            // Background slow drift
            gsap.fromTo(
                ".about-hero-bg",
                { scale: 1.08, rotation: 0.3 },
                { scale: 1, rotation: 0, duration: 30, ease: "none", repeat: -1, yoyo: true }
            );

            // Subtle light sweep
            gsap.to(".about-light-sweep", {
                x: "200%",
                duration: 5,
                ease: "power2.inOut",
                repeat: -1,
                repeatDelay: 6,
            });

            // Horizontal line draw
            gsap.fromTo(
                ".about-hero-line",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 2,
                    ease: "power3.inOut",
                    delay: 1,
                }
            );

            // SCROLL: Background parallax
            gsap.to(".about-hero-bg-wrapper", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: "25%",
                ease: "none",
            });

            // SCROLL: Content fade out
            gsap.to(".about-hero-content", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -120,
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
            className="relative w-full h-[100dvh] flex items-end justify-start overflow-hidden bg-[#030405]"
        >
            {/* Background */}
            <div className="about-hero-bg-wrapper absolute inset-0 z-0 opacity-60 overflow-hidden will-change-transform transform-gpu">
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
                    alt="Modern office architecture"
                    fill
                    className="about-hero-bg object-cover object-center opacity-40 mix-blend-screen grayscale contrast-125"
                    priority
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030405] via-transparent to-transparent" />

                {/* Light Sweep Layer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.12] mix-blend-overlay">
                    <div className="about-light-sweep absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-30deg]" />
                </div>
            </div>

            {/* Content */}
            <div className="about-hero-content relative z-10 w-full max-w-[95rem] mx-auto px-8 md:px-16 lg:px-24 xl:px-32 pb-24 md:pb-32 will-change-transform transform-gpu">
                <div className="flex flex-col items-start">
                    {/* Eyebrow */}
                    <div className="about-hero-text inline-flex items-center gap-3 px-4 py-2 border-l-2 border-signal bg-gradient-to-r from-[#1a1c23]/60 to-transparent backdrop-blur-md mb-8">
                        <span className="w-1.5 h-1.5 bg-signal shadow-[0_0_8px_rgba(255,255,255,0.8)] skew-x-[-15deg] animate-pulse" />
                        <span className="font-mono text-metallic text-[10px] uppercase tracking-[0.25em] font-medium">
                            Our Story
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="about-hero-text text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-signal leading-tight lg:leading-[1.1] tracking-tight mb-6 max-w-5xl">
                        We build the systems<br />
                        <span className="metallic-gradient-text italic font-bold">that build the future.</span>
                    </h1>

                    {/* Decorative line */}
                    <div className="about-hero-line w-32 h-px bg-gradient-to-r from-signal via-metallic/50 to-transparent origin-left mb-8" />

                    {/* Subheading */}
                    <p className="about-hero-text text-lg md:text-xl lg:text-2xl text-metallic font-sans max-w-2xl leading-relaxed tracking-wide opacity-90">
                        A premium AI automation agency born from obsessive engineering — dedicated to making businesses operate at the speed of thought.
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="about-hero-text absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <span className="font-mono text-[9px] text-metallic/40 uppercase tracking-[0.3em]">Scroll to explore</span>
                <div className="w-px h-8 bg-gradient-to-b from-signal/50 to-transparent animate-pulse" />
            </div>
        </section>
    );
}
