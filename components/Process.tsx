"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            panelsRef.current.forEach((panel, index) => {
                if (!panel) return;

                // Scale down, blur, and fade previous panels
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
                            scrub: true, // Fixed rubber-banding with Lenis
                            pin: true,
                            pinSpacing: false,
                        },
                    });
                } else {
                    // Keep last panel pinned slightly
                    ScrollTrigger.create({
                        trigger: panel,
                        start: "top top",
                        end: "+=50%",
                        pin: true,
                        pinSpacing: true,
                    });
                }
            });

            // Image Parallax Effect
            gsap.utils.toArray<HTMLElement>(".process-img").forEach((img) => {
                gsap.fromTo(img,
                    { scale: 1.1, y: "-10%" },
                    {
                        y: "10%",
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );
            });

            // Specific Panel Animations
            gsap.to(".scan-grid", {
                backgroundPosition: "0 40px, 0 40px",
                duration: 2,
                ease: "none",
                repeat: -1,
            });

            gsap.to(".laser-pass", {
                y: "400%",
                duration: 3,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const setPanelRef = (index: number) => (el: HTMLDivElement | null) => {
        panelsRef.current[index] = el;
    };

    return (
        <section ref={containerRef} id="process" className="relative w-full bg-deep-carbon text-signal pb-32 pt-24">
            <div className="pb-16 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <p className="font-mono text-xs text-metallic tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    Our Agency Engagement Model
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-signal mb-4">Our Process</h2>
            </div>

            <div className="relative">

                {/* Panel 1 */}
                <div ref={setPanelRef(0)} className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 bg-deep-carbon z-10 will-change-transform will-change-[filter] transform-gpu">
                    <div className="w-full max-w-6xl h-[85vh] rounded-[3rem] metallic-surface backdrop-blur-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transform-gpu">
                        <div className="flex-1 p-10 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-signal/10 relative z-10 w-full md:w-1/2 bg-deep-carbon/40 backdrop-blur-sm">
                            <span className="font-mono text-signal mb-6 block uppercase tracking-widest text-sm opacity-80">Phase .01</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-signal drop-shadow-lg">Discovery & Architecture</h3>
                            <p className="text-lg text-metallic font-sans leading-relaxed">
                                We perform a deep-dive audit of your operations, mapping out process bottlenecks, data silos, and high-impact areas for AI automation.
                            </p>
                        </div>
                        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
                            <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop" alt="Scan Data" fill className="process-img object-cover opacity-40 mix-blend-luminosity" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-deep-carbon/80" />
                            {/* Scan Grid */}
                            <div className="scan-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />
                            <div className="relative z-10 w-32 h-32 rounded-full border border-signal/30 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                <div className="w-16 h-16 rounded-full border border-metallic/50 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 2 */}
                <div ref={setPanelRef(1)} className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 bg-deep-carbon z-20 will-change-transform will-change-[filter] transform-gpu">
                    <div className="w-full max-w-6xl h-[85vh] rounded-[3rem] metallic-surface backdrop-blur-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative transform-gpu">
                        <div className="flex-1 p-10 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-signal/10 relative z-10 w-full md:w-1/2 bg-deep-carbon/40 backdrop-blur-sm">
                            <span className="font-mono text-signal mb-6 block uppercase tracking-widest text-sm opacity-80">Phase .02</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-signal drop-shadow-lg">Bespoke Development</h3>
                            <p className="text-lg text-metallic font-sans leading-relaxed">
                                Our engineers build, test, and deploy custom logic directly into your infrastructure, ensuring a seamless handover to your team.
                            </p>
                        </div>
                        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
                            <Image src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop" alt="Deploy Code" fill className="process-img object-cover opacity-30 mix-blend-luminosity grayscale" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-deep-carbon/80" />
                            {/* Laser Pass Layer */}
                            <div className="laser-pass absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-signal/20 to-transparent shadow-[0_0_40px_rgba(255,255,255,0.1)] mix-blend-screen pointer-events-none" />
                            <div className="relative z-10 grid grid-cols-4 gap-4 p-12 w-full h-full opacity-40 mix-blend-overlay">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="bg-signal rounded-lg border border-metallic/30" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 3 */}
                <div ref={setPanelRef(2)} className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 bg-deep-carbon z-30 will-change-transform transform-gpu">
                    <div className="w-full max-w-6xl h-[85vh] rounded-[3rem] glass-panel bg-graphite/40 backdrop-blur-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative border border-metallic/20 transform-gpu">
                        <div className="flex-1 p-10 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-signal/10 relative z-10 w-full md:w-1/2 bg-deep-carbon/40 backdrop-blur-sm">
                            <span className="font-mono text-signal mb-6 block uppercase tracking-widest text-sm opacity-80">Phase .03</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-signal drop-shadow-lg">Managed Maintenance</h3>
                            <p className="text-lg text-metallic font-sans leading-relaxed">
                                We don&apos;t just build and leave. We provide ongoing support, continuous optimization, and proactive maintenance to ensure your systems evolve with your business.
                            </p>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" alt="Continuous Scale" fill className="process-img object-cover opacity-40 mix-blend-luminosity" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-deep-carbon/80" />
                            {/* Waveform Animation */}
                            <svg className="relative z-10 w-full h-32 px-12 opacity-80" viewBox="0 0 200 40" preserveAspectRatio="none">
                                <path className="fill-none stroke-signal stroke-[1.5] shadow-[0_0_10px_rgba(255,255,255,0.8)]" d="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20">
                                    <animate attributeName="d" values="M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" dur="4s" repeatCount="indefinite" />
                                </path>
                                <path className="fill-none stroke-metallic/50 stroke-[1]" d="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20">
                                    <animate attributeName="d" values="M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 5, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20; M0 20 Q10 35, 20 20 T40 20 T60 20 T80 20 T100 20 T120 20 T140 20 T160 20 T180 20 T200 20" dur="5s" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
