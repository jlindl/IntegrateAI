"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Setup stacking animation for each card
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Skip last card for the out-animation
                if (index < cardsRef.current.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: "blur(20px)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                        },
                    });
                } else {
                    // Last card just pins
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        end: "+=100%", // Hold it for a bit
                        pin: true,
                        pinSpacing: true,
                    });
                }

                // Inner animations per card
                if (index === 0) {
                    gsap.to(".geom-motif", {
                        rotation: 360,
                        duration: 20,
                        repeat: -1,
                        ease: "linear",
                    });
                }
                if (index === 1) {
                    gsap.to(".laser-line", {
                        y: "100%",
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[index] = el;
    };

    return (
        <section ref={containerRef} id="process" className="relative w-full bg-obsidian text-ivory pb-24">
            <div className="pt-32 pb-16 max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-serif text-champagne mb-4">Deployment Protocol</h2>
                <p className="text-ivory/60 font-mono text-sm tracking-widest uppercase mb-12">The Archive //</p>
            </div>

            <div className="relative">
                {/* Card 1 */}
                <div ref={setCardRef(0)} className="sticky top-0 h-screen w-full flex items-center justify-center p-6 bg-obsidian z-10">
                    <div className="w-full max-w-5xl h-[80vh] rounded-[3rem] bg-slate/30 border border-white/5 backdrop-blur-md flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
                        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative z-10">
                            <span className="font-mono text-champagne mb-6 block">Phase 01</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6">Audit & Architect</h3>
                            <p className="text-lg text-ivory/70 font-sans leading-relaxed">
                                We analyze your current operations, identify bottlenecks, and design a custom AI architecture tailored to your precise business logic and goals.
                            </p>
                        </div>
                        <div className="flex-1 bg-black/40 relative flex items-center justify-center overflow-hidden">
                            {/* Rotating geometric motif */}
                            <div className="geom-motif w-64 h-64 border border-champagne/30 rounded-full flex items-center justify-center">
                                <div className="w-48 h-48 border border-champagne/40 rounded-full flex items-center justify-center">
                                    <div className="w-32 h-32 border border-champagne/50 rounded-full flex items-center justify-center">
                                        <div className="w-16 h-16 bg-champagne/20 rounded-full blur-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div ref={setCardRef(1)} className="sticky top-0 h-screen w-full flex items-center justify-center p-6 bg-obsidian z-20">
                    <div className="w-full max-w-5xl h-[80vh] rounded-[3rem] bg-slate/40 border border-white/5 backdrop-blur-md flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
                        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative z-10">
                            <span className="font-mono text-champagne mb-6 block">Phase 02</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6">Deploy & Integrate</h3>
                            <p className="text-lg text-ivory/70 font-sans leading-relaxed">
                                The architecture is seamlessly integrated into your existing toolstack. We handle the technical heavy lifting, ensuring a frictionless transition.
                            </p>
                        </div>
                        <div className="flex-1 bg-[#0a0a0f] relative overflow-hidden">
                            {/* Scanning laser line grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <div className="laser-line absolute top-0 left-0 w-full h-1 bg-champagne/80 shadow-[0_0_15px_rgba(201,168,76,0.8)]" />
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div ref={setCardRef(2)} className="sticky top-0 h-screen w-full flex items-center justify-center p-6 bg-obsidian z-30">
                    <div className="w-full max-w-5xl h-[80vh] rounded-[3rem] bg-slate/50 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
                        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 relative z-10">
                            <span className="font-mono text-champagne mb-6 block">Phase 03</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6">Optimize & Scale</h3>
                            <p className="text-lg text-ivory/70 font-sans leading-relaxed">
                                As the system works in the background, we continuously monitor telemetry data, refining the models to adapt and scale with your growth.
                            </p>
                        </div>
                        <div className="flex-1 bg-gradient-to-br from-obsidian to-[#111118] relative flex items-center justify-center">
                            {/* Waveform SVG animation */}
                            <svg className="w-full h-32 px-8" viewBox="0 0 200 40" preserveAspectRatio="none">
                                <path
                                    className="waveform fill-none stroke-champagne/60 stroke-[1.5]"
                                    d="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20"
                                >
                                    <animate
                                        attributeName="d"
                                        values="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20;
                            M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20;
                            M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20"
                                        dur="4s"
                                        repeatCount="indefinite"
                                    />
                                </path>
                                <path
                                    className="waveform fill-none stroke-champagne/30 stroke-[1]"
                                    d="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20"
                                >
                                    <animate
                                        attributeName="d"
                                        values="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20;
                            M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20;
                            M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
