"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
    {
        name: "Referral Partner",
        focus: "Lead Generation",
        benefits: [
            "15% recurring revenue share",
            "Zero delivery responsibility",
            "Dedicated referral portal",
            "Standard sales support"
        ],
        cta: "Sign Up Today"
    },
    {
        name: "White Label Partner",
        focus: "Brand Expansion",
        benefits: [
            "Integrate expertise, your branding",
            "Technical architect access",
            "Co-branded documentation",
            "20% margin protection"
        ],
        cta: "Request Demo",
        featured: true
    },
    {
        name: "Strategic Affiliate",
        focus: "Ecosystem Growth",
        benefits: [
            "Co-selling opportunities",
            "Priority engineering support",
            "Custom API integrations",
            "Quarterly strategy sessions"
        ],
        cta: "Partner With Us"
    }
];

export default function PartnerTiers() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".partner-mechanics-card",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-[#050607]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-signal/40 mb-6 block">The Mechanics</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
                            A singular focus<br />
                            <span className="italic text-white/50">on performance.</span>
                        </h2>
                        <p className="text-metallic text-lg leading-relaxed mb-12 max-w-xl">
                            We don&apos;t build SaaS tools. We engineer bespoke agency solutions for high-growth enterprises. Our referral system is designed for partners who value precision, reliability, and recurring growth.
                        </p>
                        
                        <div className="space-y-8">
                            {[
                                { title: "Simple Referral", desc: "Introduce a qualified lead to the Integrate architectural team." },
                                { title: "Seamless Delivery", desc: "We handle the audit, the build, and the long-term management." },
                                { title: "Transparent Payout", desc: "Receive 15% of the total revenue generated, monthly." },
                            ].map((item, i) => (
                                <div key={i} className="partner-mechanics-card flex gap-6">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-mono text-[10px] text-signal">
                                        0{i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-sans font-bold text-base mb-1">{item.title}</h4>
                                        <p className="text-metallic text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="partner-mechanics-card relative">
                        <div className="glass-panel p-1 border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black">
                            <div className="bg-[#030405] p-10 md:p-16 rounded-xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-signal font-serif text-[120px] leading-none mb-4">15<span className="text-5xl">%</span></div>
                                    <p className="font-mono text-xs uppercase tracking-[0.5em] text-metallic mb-10">Revenue Share Engine</p>
                                    <div className="w-full h-px bg-white/5 mb-10" />
                                    <div className="space-y-6 w-full">
                                        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/40">
                                            <span>Partner Intensity</span>
                                            <span className="text-signal">High Priority</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/40">
                                            <span>Payout Cadence</span>
                                            <span className="text-white">Monthly</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/40">
                                            <span>Relationship type</span>
                                            <span className="text-white">Referral-Only</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative glow */}
                        <div className="absolute -inset-4 bg-signal/10 blur-[80px] rounded-full -z-10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
