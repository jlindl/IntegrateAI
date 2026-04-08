"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crosshair, Handshake, Lightbulb, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        icon: Crosshair,
        name: "Precision",
        description:
            "Every system we build is surgically tailored. No templates, no shortcuts — just architecture that fits your exact operational logic.",
    },
    {
        icon: Handshake,
        name: "Partnership",
        description:
            "We embed into your team. Your goals become our sprints. Your bottlenecks become our obsessions. We scale when you scale.",
    },
    {
        icon: Lightbulb,
        name: "Innovation",
        description:
            "We stay 18 months ahead. Our engineers research, prototype, and deploy cutting-edge AI before it becomes a buzzword.",
    },
    {
        icon: ShieldCheck,
        name: "Integrity",
        description:
            "Transparent pricing, honest timelines, confidential by default. We only take projects where we can guarantee measurable results.",
    },
];

export default function AboutValues() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            gsap.fromTo(
                ".values-header",
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            // Cards stagger entrance
            gsap.fromTo(
                ".value-card",
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power3.out",
                }
            );

            // Ambient glow pulse
            gsap.to(".values-glow", {
                scale: 1.1,
                opacity: 0.08,
                duration: 4,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 md:py-48 bg-[#030405] overflow-hidden">
            {/* Ambient glow orbs */}
            <div className="values-glow absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-signal/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="values-glow absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-signal/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="values-header font-mono text-xs text-metallic uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        What Drives Us
                    </span>
                    <h2 className="values-header text-3xl md:text-5xl lg:text-6xl font-serif text-signal mt-4">
                        Core <span className="metallic-gradient-text italic font-bold">Values</span>
                    </h2>
                </div>

                {/* Values Grid */}
                <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {VALUES.map((value) => (
                        <div
                            key={value.name}
                            className="value-card group glass-panel p-10 md:p-12 rounded-[2rem] border border-metallic/10 hover:border-metallic/30 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transform-gpu cursor-default"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-14 h-14 rounded-[1rem] bg-gradient-to-br from-[#1a1c23] to-[#0a0c0e] border border-metallic/15 flex items-center justify-center group-hover:border-signal/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500">
                                    <value.icon size={24} className="text-signal/80 group-hover:text-signal transition-colors duration-300" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-serif text-signal mb-3 group-hover:metallic-gradient-text transition-all duration-300">
                                        {value.name}
                                    </h3>
                                    <p className="text-sm md:text-base text-metallic/70 font-sans leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
