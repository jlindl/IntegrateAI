"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Code, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger entrance for cards
            gsap.from(".feature-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });

            // Typewriter effect simulation for Card 2
            const textEl = document.querySelector(".telemetry-text");
            if (textEl) {
                gsap.to(textEl, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    },
                    text: "Custom-built for your business, not a generic template.",
                    duration: 2,
                    ease: "none",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full py-32 bg-obsidian text-ivory overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-champagne mb-4">Functional Artifacts</h2>
                    <p className="text-ivory/60 font-mono text-sm tracking-widest uppercase">System Capabilities //</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Diagnostic Shuffler */}
                    <div className="feature-card group relative flex flex-col justify-between items-start bg-slate/20 backdrop-blur-sm border-t border-l border-white/5 rounded-[2rem] md:rounded-[3rem] p-10 hover:bg-slate/40 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <div className="mb-12 text-champagne group-hover:rotate-[15deg] transition-transform duration-500">
                            <Activity size={36} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-sans font-medium mb-3">Diagnostic Shuffler</h3>
                            <p className="text-ivory/70 font-sans tracking-wide leading-relaxed">
                                We build AI systems that bring you more leads, sales, and time back.
                            </p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-mono text-xs text-champagne">01</span>
                        </div>
                    </div>

                    {/* Card 2: Telemetry Typewriter */}
                    <div className="feature-card group relative flex flex-col justify-between items-start bg-slate/20 backdrop-blur-sm border-t border-l border-white/5 rounded-[2rem] md:rounded-[3rem] p-10 hover:bg-slate/40 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <div className="mb-12 text-champagne group-hover:scale-110 transition-transform duration-500">
                            <Code size={36} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-sans font-medium mb-3">Telemetry Typewriter</h3>
                            <p className="text-ivory/70 font-sans tracking-wide leading-relaxed min-h-[48px]">
                                <span className="text-ivory/30 group-hover:text-ivory/70 transition-colors duration-700">Every solution is custom-built for your business, not a generic template.</span>
                            </p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-mono text-xs text-champagne">02</span>
                        </div>
                    </div>

                    {/* Card 3: Cursor Protocol Scheduler */}
                    <div className="feature-card group relative flex flex-col justify-between items-start bg-slate/20 backdrop-blur-sm border-t border-l border-white/5 rounded-[2rem] md:rounded-[3rem] p-10 hover:bg-slate/40 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <div className="mb-12 text-champagne group-hover:rotate-[-15deg] transition-transform duration-500">
                            <Clock size={36} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-sans font-medium mb-3">Cursor Protocol</h3>
                            <p className="text-ivory/70 font-sans tracking-wide leading-relaxed">
                                We handle everything for you, so the system just works right in the background.
                            </p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-mono text-xs text-champagne">03</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
