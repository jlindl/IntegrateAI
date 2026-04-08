"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { label: "Founded", value: 2022, suffix: "" },
    { label: "Projects Delivered", value: 80, suffix: "+" },
    { label: "Hours Automated", value: 120, suffix: "k+" },
];

export default function AboutMission() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left column fade up
            gsap.fromTo(
                ".mission-left-item",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: "power3.out",
                }
            );

            // Right manifesto — word-by-word scrub reveal
            gsap.utils.toArray<HTMLElement>(".manifesto-word").forEach((word, i) => {
                gsap.fromTo(
                    word,
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `top+=${i * 40} 60%`,
                            end: `top+=${i * 40 + 80} 40%`,
                            scrub: true,
                        },
                    }
                );
            });

            // Vertical divider draw
            gsap.fromTo(
                ".mission-divider",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 40%",
                        scrub: true,
                    },
                }
            );

            // Stats counter animation
            gsap.utils.toArray<HTMLElement>(".mission-counter").forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-target") || "0", 10);
                gsap.to(counter, {
                    scrollTrigger: {
                        trigger: ".mission-stats",
                        start: "top 85%",
                    },
                    innerText: target,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                });
            });

            // Stats fade in
            gsap.fromTo(
                ".mission-stat-card",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".mission-stats", start: "top 85%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const manifesto = "We don't just automate workflows. We architect precision systems that compound advantage — turning operational chaos into strategic velocity.";
    const words = manifesto.split(" ");

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-48 bg-[#050607] overflow-hidden"
        >
            {/* Ambient texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">

                    {/* Left: Story */}
                    <div className="flex flex-col gap-8">
                        <span className="mission-left-item font-mono text-xs text-metallic uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                            The Origin
                        </span>
                        <h2 className="mission-left-item text-3xl md:text-5xl font-serif text-signal leading-tight">
                            Born from <span className="metallic-gradient-text italic font-bold">obsession.</span>
                        </h2>
                        <p className="mission-left-item text-base md:text-lg text-metallic font-sans leading-relaxed max-w-lg">
                            Integrate was founded by a team of engineers and strategists who saw the same pattern everywhere — brilliant companies drowning in manual processes. We built something different: an agency that thinks in systems, not services.
                        </p>
                        <p className="mission-left-item text-base md:text-lg text-metallic/70 font-sans leading-relaxed max-w-lg">
                            Every engagement starts with architecture. Every solution is built to compound. We don&apos;t sell hours — we engineer outcomes that accelerate over time.
                        </p>
                    </div>

                    {/* Center divider (desktop only) */}
                    <div className="mission-divider hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-metallic/20 to-transparent origin-top" />

                    {/* Right: Manifesto */}
                    <div className="flex items-start pt-4">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-signal leading-[1.3] tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-1">
                            {words.map((word, i) => (
                                <span
                                    key={i}
                                    className="manifesto-word inline-block transition-none"
                                >
                                    {word}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="mission-stats grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 pt-16 border-t border-metallic/10">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="mission-stat-card glass-panel p-8 rounded-sm border border-metallic/10 text-center">
                            <span className="font-mono text-[10px] text-metallic/60 uppercase tracking-widest block mb-4">{stat.label}</span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span
                                    className="mission-counter text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                                    data-target={stat.value}
                                >
                                    0
                                </span>
                                {stat.suffix && <span className="text-xl font-serif text-metallic">{stat.suffix}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
