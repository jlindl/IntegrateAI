"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
    {
        year: "Q1 2025",
        phase: "Chapter .01",
        title: "The Genesis",
        description:
            "Integrate was founded with a single conviction: enterprise AI is broken. We set out to build the architecture that bridges the gap between raw LLMs and mission-critical ops.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop",
        imageAlt: "Startup workspace",
    },
    {
        year: "Q2 2025",
        phase: "Chapter .02",
        title: "Building the Core",
        description:
            "Formalized our first 3 custom agent frameworks. We focused on speed to deployment and vertical-specific logic for high-growth B2B companies.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2670&auto=format&fit=crop",
        imageAlt: "Engineering development",
    },
    {
        year: "Now",
        phase: "Chapter .03",
        title: "The Pioneer Cohort",
        description:
            "Today we are scaling with our first dozen enterprise partners, battle-testing multi-agent orchestration and refining the systems that will define the next decade of automation.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop",
        imageAlt: "AI visualization",
    },
];

export default function AboutTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            gsap.fromTo(
                ".timeline-header",
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            // Sticky stacking cards
            panelsRef.current.forEach((panel, index) => {
                if (!panel) return;

                if (index < panelsRef.current.length - 1) {
                    gsap.to(panel, {
                        scale: 0.92,
                        opacity: 0.45,
                        filter: "blur(20px)",
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: panel,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                        },
                    });
                } else {
                    ScrollTrigger.create({
                        trigger: panel,
                        start: "top top",
                        end: "+=50%",
                        pin: true,
                        pinSpacing: true,
                    });
                }
            });

            // Image parallax
            gsap.utils.toArray<HTMLElement>(".timeline-img").forEach((img) => {
                gsap.fromTo(
                    img,
                    { scale: 1.15, y: "-10%" },
                    {
                        y: "10%",
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });

            // Scan grid animation (Panel 1)
            gsap.to(".timeline-scan-grid", {
                backgroundPosition: "0 40px, 0 40px",
                duration: 2,
                ease: "none",
                repeat: -1,
            });

            // Laser pass animation (Panel 2)
            gsap.to(".timeline-laser", {
                y: "400%",
                duration: 3,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            });

            // Rotating motif (Panel 3)
            gsap.to(".timeline-motif", {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const setPanelRef = (index: number) => (el: HTMLDivElement | null) => {
        panelsRef.current[index] = el;
    };

    const panelAnimations = [
        // Panel 1: Scan Grid
        <div key="anim-0" className="absolute inset-0 pointer-events-none">
            <div className="timeline-scan-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_40px]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-signal/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                    <div className="w-10 h-10 rounded-full border border-metallic/40 animate-pulse" />
                </div>
            </div>
        </div>,

        // Panel 2: Laser Pass
        <div key="anim-1" className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="timeline-laser absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-signal/15 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.08)] mix-blend-screen" />
            <div className="absolute inset-0 grid grid-cols-4 gap-3 p-10 opacity-30 mix-blend-overlay">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="bg-signal/10 rounded-lg border border-metallic/20" />
                ))}
            </div>
        </div>,

        // Panel 3: Rotating Motif
        <div key="anim-2" className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="timeline-motif w-48 h-48 opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <polygon points="100,30 170,70 170,130 100,170 30,130 30,70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                </svg>
            </div>
        </div>,

        // Panel 4: Waveform
        <div key="anim-3" className="absolute inset-0 pointer-events-none flex items-center justify-center px-12">
            <svg className="w-full h-24 opacity-60" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path className="fill-none stroke-signal stroke-[1.5]" d="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20">
                    <animate attributeName="d" values="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" dur="4s" repeatCount="indefinite" />
                </path>
                <path className="fill-none stroke-metallic/40 stroke-[0.8]" d="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20">
                    <animate attributeName="d" values="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" dur="5s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>,
    ];

    return (
        <section ref={containerRef} className="relative w-full bg-deep-carbon text-signal pb-32 pt-24">
            {/* Header */}
            <div className="pb-16 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <p className="timeline-header font-mono text-xs text-metallic tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    The Journey So Far
                </p>
                <h2 className="timeline-header text-4xl md:text-5xl lg:text-6xl font-serif text-signal mb-4">
                    Our <span className="metallic-gradient-text italic font-bold">Timeline</span>
                </h2>
            </div>

            {/* Stacking Panels */}
            <div className="relative">
                {MILESTONES.map((milestone, index) => (
                    <div
                        key={milestone.year}
                        ref={setPanelRef(index)}
                        className={`sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 bg-deep-carbon z-${(index + 1) * 10} will-change-transform will-change-[filter] transform-gpu`}
                    >
                        <div className="w-full max-w-6xl h-[85vh] rounded-[3rem] metallic-surface backdrop-blur-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transform-gpu">
                            {/* Text side */}
                            <div className="flex-1 p-10 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-signal/10 relative z-10 w-full md:w-1/2 bg-deep-carbon/40 backdrop-blur-sm">
                                <span className="font-mono text-signal mb-2 block uppercase tracking-widest text-sm opacity-80">
                                    {milestone.phase}
                                </span>
                                <span className="font-mono text-metallic/40 mb-6 block text-xs tracking-[0.2em]">
                                    {milestone.year}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-serif mb-6 text-signal drop-shadow-lg">
                                    {milestone.title}
                                </h3>
                                <p className="text-lg text-metallic font-sans leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>

                            {/* Visual side */}
                            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
                                <Image
                                    src={milestone.image}
                                    alt={milestone.imageAlt}
                                    fill
                                    className="timeline-img object-cover opacity-35 mix-blend-luminosity grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-deep-carbon/80" />
                                {panelAnimations[index]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
