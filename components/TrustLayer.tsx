"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    SiGmail, SiWhatsapp, SiHubspot, SiN8N, SiGooglecloud,
    SiSlack, SiSalesforce, SiZapier, SiOpenai, SiNotion, SiStripe
} from "react-icons/si";

// Custom GoHighLevel Icon Shape
const GoHighLevelIcon = ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4.5 19.5L12 4.5l3.5 7h4v4h-5L12 11l-4.5 9h-3z" />
    </svg>
);

// Custom Monday.com Icon Shape
const MondayIcon = ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 5.5A2.5 2.5 0 0 0 9.5 8v8A2.5 2.5 0 0 0 12 18.5a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 12 5.5z M5.5 8.5A2.5 2.5 0 0 0 3 11v5a2.5 2.5 0 0 0 5 0v-5A2.5 2.5 0 0 0 5.5 8.5z M18.5 8.5A2.5 2.5 0 0 0 16 11v5a2.5 2.5 0 0 0 5 0v-5A2.5 2.5 0 0 0 18.5 8.5z" />
    </svg>
);

const METRICS_DATA = [
    { id: 1, label: "Pioneer ROI", value: 240, suffix: "%+", desc: "Average returns across early adopters" },
    { id: 2, label: "Custom Agents", value: 16, suffix: "+", desc: "Engineered for the Pioneer Cohort" },
    { id: 3, label: "Initial Time Reclaimed", value: 8500, suffix: "+", desc: "Man-hours optimized to date" },
    { id: 4, label: "Avg. Deployment", prefix: "< ", value: 14, suffix: "d", desc: "To initial system go-live" },
];

const LOGOS = [
    { icon: GoHighLevelIcon, name: "GoHighLevel" },
    { icon: SiGmail, name: "Gmail" },
    { icon: SiWhatsapp, name: "WhatsApp" },
    { icon: SiHubspot, name: "HubSpot" },
    { icon: MondayIcon, name: "Monday.com" },
    { icon: SiN8N, name: "n8n" },
    { icon: SiGooglecloud, name: "Google Cloud" },
    { icon: SiSlack, name: "Slack" },
    { icon: SiSalesforce, name: "Salesforce" },
    { icon: SiZapier, name: "Zapier" },
    { icon: SiOpenai, name: "OpenAI" },
    { icon: SiNotion, name: "Notion" },
    { icon: SiStripe, name: "Stripe" }
];

export default function TrustLayer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                ".trust-header-elem",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out"
                }
            );

            // Metrics reveal
            gsap.fromTo(
                ".trust-metric",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: ".metrics-container",
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            // Number Counters
            gsap.utils.toArray<HTMLElement>(".metric-counter").forEach((counter) => {
                const targetNumber = parseInt(counter.getAttribute("data-target") || "0", 10);
                gsap.to(counter, {
                    scrollTrigger: {
                        trigger: ".metrics-container",
                        start: "top 85%",
                    },
                    innerText: targetNumber,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                });
            });

            // Continuous Logo Marquee
            gsap.to(".marquee-content", {
                xPercent: -50,
                ease: "none",
                duration: 20,
                repeat: -1,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#030405] overflow-hidden border-y border-metallic/10">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">

                {/* Header */}
                <span className="trust-header-elem font-mono text-xs text-metallic uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    Supported Ecosystems
                </span>
                <h2 className="trust-header-elem text-4xl md:text-5xl font-serif text-signal mb-16 md:mb-24">
                    Infinite <span className="metallic-gradient-text italic font-bold">integrations.</span>
                </h2>

                {/* Logo Marquee */}
                <div className="trust-header-elem relative w-full max-w-5xl mx-auto overflow-hidden mb-24 md:mb-32 mask-image-linear">
                    <div className="marquee-content flex w-[200%] gap-8">
                        {/* Quadrupled for seamless hardware-accelerated looping */}
                        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                            <div key={i} className="flex flex-1 items-center justify-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 transform-gpu cursor-default">
                                <logo.icon size={28} className="text-metallic shrink-0" />
                                <span className="font-sans font-bold text-xl md:text-2xl tracking-wider text-metallic whitespace-nowrap">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="metrics-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {METRICS_DATA.map((mod) => (
                        <div key={mod.id} className="trust-metric glass-panel p-6 md:p-10 rounded-sm border border-metallic/10 flex flex-col items-center text-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] hover:border-metallic/30 transition-colors duration-500 transform-gpu">
                            <span className="font-mono text-xs text-metallic/60 uppercase tracking-widest mb-6 block">{mod.label}</span>

                            <div className="flex items-baseline gap-1 text-signal mb-4">
                                {mod.prefix && <span className="text-2xl font-serif text-metallic">{mod.prefix}</span>}
                                <span className="metric-counter text-5xl md:text-6xl font-serif text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" data-target={mod.value}>0</span>
                                <span className="text-2xl font-serif text-metallic">{mod.suffix}</span>
                            </div>

                            <p className="text-sm text-metallic/80 font-sans mt-auto leading-relaxed max-w-[180px]">{mod.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA after metrics */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-[#030405] rounded-sm font-sans text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] skew-x-[-5deg]"
                    >
                        <span className="inline-flex items-center gap-2 skew-x-[5deg]">
                            Book a Strategy Call
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="group-hover:translate-x-1 transition-transform">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </a>
                    <p className="text-xs font-mono text-metallic/50 tracking-widest uppercase">No-commitment discovery call · 30 min</p>
                </div>

            </div>
        </section>
    );
}
