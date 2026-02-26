"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, TrendingUp, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PortalValueEngine() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [traffic, setTraffic] = useState(50000);
    const avgOrderValue = 150;
    const baseConvRate = 0.02; // 2% Base

    // Performance boost from Next.js + Edge Architecture
    const liftMultiplier = 1.45; // 45% lift

    const baseRevenue = traffic * baseConvRate * avgOrderValue;
    const projectedRevenue = traffic * (baseConvRate * liftMultiplier) * avgOrderValue;
    const delta = projectedRevenue - baseRevenue;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in ROI Engine Content as you scroll down
            gsap.fromTo(contentRef.current,
                { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    const formatNumber = (val: number) =>
        new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

    return (
        <section ref={containerRef} className="relative z-40 w-full min-h-screen bg-[#030405] flex items-center justify-center py-24">
            <div className="w-full">
                {/* Grid background for technical feel */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                    {/* Left Column: Inputs & Copy */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <p className="font-mono text-signal text-xs tracking-[0.2em] uppercase mb-2">Performance Calculator</p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-tighter mb-4">
                                The ROI of <br />Speed.
                            </h2>
                            <p className="text-metallic/70 text-sm md:text-base max-w-md leading-relaxed">
                                A 1-second delay in page load yields a 7% loss in conversions. Our custom architectures load in under 50ms. Calculate your projected revenue lift based on your current traffic.
                            </p>
                        </div>

                        <div className="space-y-8 bg-[#0a0c0e]/80 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            {/* Traffic Slider */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest flex items-center gap-2">
                                        <Users size={14} className="text-signal" /> Monthly Visitors
                                    </label>
                                    <div className="text-xl md:text-2xl font-mono text-white tracking-widest">{formatNumber(traffic)}</div>
                                </div>
                                <input
                                    type="range"
                                    min="5000"
                                    max="500000"
                                    step="5000"
                                    value={traffic}
                                    onChange={(e) => setTraffic(Number(e.target.value))}
                                    className="w-full h-2 rounded-lg cursor-pointer accent-signal"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Outputs */}
                    <div className="flex flex-col justify-center gap-6">

                        {/* Huge Delta Highlight */}
                        <div className="bg-signal/5 border border-signal/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-signal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <p className="font-mono text-[10px] md:text-xs text-signal uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <TrendingUp size={14} /> Projected Monthly Lift
                                </p>
                                <div className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none flex items-start">
                                    <span className="text-signal text-4xl md:text-6xl mt-2 mr-1">+</span>{formatCurrency(delta).replace('$', '')}
                                </div>
                            </div>

                            {/* Decorative ambient flare */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-signal/20 blur-[60px] rounded-full pointer-events-none" />
                        </div>

                        {/* Smaller Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-[#0a0c0e]/80 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
                                <p className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mb-2">Current Revenue</p>
                                <div className="text-xl md:text-2xl font-mono text-metallic">{formatCurrency(baseRevenue)}</div>
                            </div>
                            <div className="bg-[#0a0c0e]/80 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
                                <p className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mb-2">New Conversion Rate</p>
                                <div className="text-xl md:text-2xl font-mono text-metallic">{(baseConvRate * liftMultiplier * 100).toFixed(1)}%</div>
                            </div>
                        </div>

                        {/* Conversion Button */}
                        <button className="mt-2 w-full bg-white text-black py-5 rounded-2xl font-mono text-sm uppercase tracking-[0.2em] font-medium hover:bg-signal hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group">
                            Start A Project <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
