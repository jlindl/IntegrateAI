"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Mail,
    MessageSquare,
    Bot,
    Database,
    CreditCard,
    Activity,
    Layers,
    Zap,
    Globe,
    Code2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const specialties = [
    {
        id: "01",
        title: "Lead Generation",
        description: "Cold email, WhatsApp, SMS, AI sales agents.",
    },
    {
        id: "02",
        title: "Process Automation",
        description: "CRM sync, automated invoicing, AI-driven triage.",
    },
    {
        id: "03",
        title: "Web Design",
        description: "Premium frontend, robust full-stack architecting.",
    },
];

// Each plate gets this many viewport-heights of scroll real estate
const SCROLL_PER_PLATE = 1.5;

export default function SpecialtiesArchive() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const leftTextRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rightCardsRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const cards = rightCardsRefs.current;
            const texts = leftTextRefs.current;
            const n = specialties.length;

            // ── Set initial states ───────────────────────────────────────────
            texts.forEach((text, i) => {
                if (!text) return;
                const ind = text.querySelector<HTMLElement>(".indicator");
                const h2 = text.querySelector<HTMLElement>("h2");
                gsap.set(text, { opacity: i === 0 ? 1 : 0.25 });
                gsap.set(ind, { scaleX: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 });
                gsap.set(h2, { color: i === 0 ? "#FFFFFF" : "#6B7280" });
            });
            cards.forEach((card, i) => {
                if (card && i > 0) gsap.set(card, { yPercent: 105 });
            });

            // ── Single master timeline scrubbed across the full wrapper ───────
            // Timeline is divided into segments per plate:
            //   [HOLD_RATIO units] → [1 unit transition] → [HOLD_RATIO units] → …
            // The total scrub distance = wrapper height (CSS sticky handles pinning).
            const HOLD = 1.5;  // hold time relative to 1 transition unit
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                },
            });

            // Initial hold on plate 1
            tl.to({}, { duration: HOLD });

            for (let i = 1; i < n; i++) {
                const card = cards[i];
                const prevText = texts[i - 1];
                const nextText = texts[i];

                // All transition tweens run in parallel at this label
                tl.addLabel(`t${i}`);

                // Right panel: slide current plate out upward AND next plate up from below (in sync)
                if (card) {
                    tl.fromTo(card,
                        { yPercent: 105 },
                        { yPercent: 0, ease: "power2.inOut", duration: 1 },
                        `t${i}`
                    );
                }
                const prevCard = cards[i - 1];
                if (prevCard) {
                    tl.to(prevCard,
                        { yPercent: -105, ease: "power2.inOut", duration: 1 },
                        `t${i}`
                    );
                }

                // Left panel: dim previous
                if (prevText) {
                    const prevInd = prevText.querySelector<HTMLElement>(".indicator");
                    const prevH2 = prevText.querySelector<HTMLElement>("h2");
                    tl.to(prevText, { opacity: 0.25, ease: "none", duration: 1 }, `t${i}`);
                    if (prevInd) tl.to(prevInd, { scaleX: 0, opacity: 0, ease: "none", duration: 1 }, `t${i}`);
                    if (prevH2) tl.to(prevH2, { color: "#6B7280", ease: "none", duration: 1 }, `t${i}`);
                }

                // Left panel: illuminate next
                if (nextText) {
                    const nextInd = nextText.querySelector<HTMLElement>(".indicator");
                    const nextH2 = nextText.querySelector<HTMLElement>("h2");
                    tl.fromTo(nextText, { opacity: 0.25 }, { opacity: 1, ease: "none", duration: 1 }, `t${i}`);
                    if (nextInd) tl.fromTo(nextInd, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, ease: "none", duration: 1 }, `t${i}`);
                    if (nextH2) tl.fromTo(nextH2, { color: "#6B7280" }, { color: "#FFFFFF", ease: "none", duration: 1 }, `t${i}`);
                }

                // Hold on the new plate (except after the last transition)
                if (i < n - 1) {
                    tl.to({}, { duration: HOLD });
                }
            }

            // ── Ambient float ─────────────────────────────────────────────────
            gsap.to(".layer-back", { y: -15, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
            gsap.to(".layer-mid", { y: -25, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
            gsap.to(".layer-front", { y: -10, duration: 1.9, yoyo: true, repeat: -1, ease: "sine.inOut" });

            ScrollTrigger.refresh();
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const totalScrollHeight = `${SCROLL_PER_PLATE * specialties.length * 100}vh`;

    return (
        <div ref={wrapperRef} style={{ height: totalScrollHeight }} className="relative w-full isolate">
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-deep-carbon flex border-y border-white/5">

                {/* ── LEFT SIDE ─────────────────────────────────────────────── */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-24 relative z-10 border-r border-white/5 bg-deep-carbon shrink-0">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(255,255,255,0.04)_0%,transparent_60%)]" />
                    </div>
                    <div className="space-y-14">
                        {specialties.map((spec, i) => (
                            <div
                                key={spec.id}
                                ref={(el) => { leftTextRefs.current[i] = el; }}
                                className="relative"
                            >
                                <div className="flex items-center gap-5 mb-3">
                                    <span className="text-lg font-mono text-metallic">{spec.id}</span>
                                    <div className="indicator h-[1px] w-12 bg-white origin-left" />
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    {spec.title}
                                </h2>
                                <p className="mt-4 text-metallic text-base md:text-lg font-light max-w-xs tracking-wide leading-relaxed">
                                    {spec.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-14 pt-10 border-t border-white/5">
                        <a
                            href="#"
                            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#030405] rounded-sm font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] skew-x-[-5deg]"
                        >
                            <span className="skew-x-[5deg] flex items-center gap-2">
                                Start a Project
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="group-hover:translate-x-1 transition-transform">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </a>
                        <p className="mt-3 text-[10px] font-mono text-metallic/40 tracking-widest uppercase">Response within 24 hours</p>
                    </div>
                </div>


                {/* ── RIGHT SIDE — stacked plates ───────────────────────────── */}
                <div className="w-full md:w-1/2 h-full relative overflow-hidden hidden md:block shrink-0">

                    {/* ── PLATE 1 — Lead Generation ─────────────────────────── */}
                    <div
                        ref={(el) => { rightCardsRefs.current[0] = el; }}
                        className="absolute inset-0 bg-[#050608] overflow-hidden flex items-center justify-center p-10"
                    >
                        <div className="w-full max-w-lg flex flex-col gap-10">
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white tracking-tight">Automated Lead Generation Infrastructure</h3>
                                <p className="text-metallic text-sm leading-relaxed max-w-md">
                                    A scalable outbound engine that continuously sources, engages, and qualifies prospects across multiple channels.
                                </p>
                                <ul className="space-y-2 pt-2">
                                    {[
                                        "Deliverability-optimised cold email systems",
                                        "AI WhatsApp agents that convert conversations into leads",
                                        "Intelligent SMS sequences that follow up and book calls"
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-metallic">
                                            <div className="w-1 h-1 rounded-full bg-white shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Architecture Diagram */}
                            <div className="relative w-full rounded-xl border border-white/5 bg-deep-carbon/60 overflow-hidden p-8">
                                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                <div className="relative z-10 flex flex-col items-center gap-0">
                                    {/* Channel nodes */}
                                    <div className="flex justify-between w-full max-w-xs">
                                        {[{ icon: Mail, label: "EMAIL" }, { icon: MessageSquare, label: "SMS/WA" }, { icon: Bot, label: "AI AGENT" }].map(({ icon: Icon, label }) => (
                                            <div key={label} className="flex flex-col items-center gap-1.5">
                                                <div className="w-9 h-9 rounded-lg bg-graphite border border-white/10 flex items-center justify-center">
                                                    <Icon className="w-3.5 h-3.5 text-metallic" />
                                                </div>
                                                <span className="text-[8px] font-mono text-metallic/60 tracking-widest">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Converging lines */}
                                    <div className="flex justify-between w-full max-w-xs px-5 relative mt-1">
                                        <div className="h-7 w-[1px] bg-gradient-to-b from-white/15 to-white/40 self-end rotate-[20deg] origin-top translate-x-2" />
                                        <div className="h-7 w-[1px] bg-gradient-to-b from-white/15 to-white/40" />
                                        <div className="h-7 w-[1px] bg-gradient-to-b from-white/15 to-white/40 self-end -rotate-[20deg] origin-top -translate-x-2" />
                                    </div>
                                    {/* Engine pill */}
                                    <div className="flex items-center gap-2.5 px-5 py-2.5 border border-white/15 rounded-full bg-white/[0.04] mt-0">
                                        <Activity className="w-3.5 h-3.5 text-white" />
                                        <span className="text-[10px] font-mono text-white tracking-[0.15em]">OUTBOUND_ENGINE</span>
                                    </div>
                                    {/* Output line */}
                                    <div className="h-5 w-[1px] bg-gradient-to-b from-white/40 to-white/10 mt-0" />
                                    {/* CRM pill */}
                                    <div className="flex items-center gap-2.5 px-5 py-2.5 border border-white/10 rounded-full bg-white/[0.02]">
                                        <Database className="w-3 h-3 text-metallic" />
                                        <span className="text-[10px] font-mono text-metallic tracking-[0.15em]">CRM / PIPELINE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── PLATE 2 — Process Automation ──────────────────────── */}
                    <div
                        ref={(el) => { rightCardsRefs.current[1] = el; }}
                        className="absolute inset-0 bg-[#060709] overflow-hidden flex items-center justify-center p-10"
                    >
                        <div className="w-full max-w-lg flex flex-col gap-10">
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white tracking-tight">Intelligent Workflow Automation</h3>
                                <p className="text-metallic text-sm leading-relaxed max-w-md">
                                    End-to-end automation that eliminates manual bottlenecks — syncing your CRM, generating invoices, and routing leads with zero human touch.
                                </p>
                                <ul className="space-y-2 pt-2">
                                    {["Real-time CRM sync & enrichment", "AI-powered lead triage & routing", "Automated invoicing & payment follow-up"].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-metallic">
                                            <div className="w-1 h-1 rounded-full bg-white shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Automation Flow Diagram */}
                            <div className="relative w-full rounded-xl border border-white/5 bg-deep-carbon/60 overflow-hidden p-8">
                                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    {/* Flow steps */}
                                    {[
                                        { icon: Zap, label: "TRIGGER", sub: "New lead / form fill" },
                                        { icon: Bot, label: "AI TRIAGE", sub: "Score & categorise" },
                                        { icon: Database, label: "CRM SYNC", sub: "Update & enrich" },
                                        { icon: CreditCard, label: "INVOICE", sub: "Auto-generate & send" },
                                    ].map(({ icon: Icon, label, sub }, idx, arr) => (
                                        <div key={label} className="flex flex-col items-center w-full">
                                            <div className="flex items-center gap-3 w-full max-w-xs">
                                                <div className="w-8 h-8 rounded-lg bg-graphite border border-white/10 flex items-center justify-center shrink-0">
                                                    <Icon className="w-3.5 h-3.5 text-metallic" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-mono text-white tracking-widest">{label}</span>
                                                    <span className="text-[9px] font-mono text-metallic/50">{sub}</span>
                                                </div>
                                            </div>
                                            {idx < arr.length - 1 && (
                                                <div className="h-4 w-[1px] bg-gradient-to-b from-white/30 to-white/10 my-0.5" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── PLATE 3 — Web Design ──────────────────────────────── */}
                    <div
                        ref={(el) => { rightCardsRefs.current[2] = el; }}
                        className="absolute inset-0 bg-[#07080A] overflow-hidden flex items-center justify-center p-10"
                    >
                        <div className="w-full max-w-lg flex flex-col gap-10">
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-white tracking-tight">Premium Digital Experiences</h3>
                                <p className="text-metallic text-sm leading-relaxed max-w-md">
                                    Pixel-perfect frontends married to resilient, scalable full-stack architecture — built to convert visitors and grow with your business.
                                </p>
                                <ul className="space-y-2 pt-2">
                                    {["Cinematic, animation-led interfaces", "Next.js & headless CMS integration", "Scalable API & database architecture"].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm text-metallic">
                                            <div className="w-1 h-1 rounded-full bg-white shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Stack Diagram */}
                            <div className="relative w-full rounded-xl border border-white/5 bg-deep-carbon/60 overflow-hidden p-8">
                                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                <div className="relative z-10 flex flex-col gap-3">
                                    {/* Stack layers */}
                                    {[
                                        { icon: Globe, layer: "FRONTEND", desc: "Next.js · Framer · GSAP", border: "border-white/20" },
                                        { icon: Code2, layer: "API LAYER", desc: "tRPC · REST · GraphQL", border: "border-white/10" },
                                        { icon: Database, layer: "DATA", desc: "Postgres · Supabase · Prisma", border: "border-white/8" },
                                        { icon: Layers, layer: "INFRA", desc: "Vercel · AWS · Cloudflare", border: "border-white/5" },
                                    ].map(({ icon: Icon, layer, desc, border }) => (
                                        <div key={layer} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${border} bg-white/[0.02]`}>
                                            <div className="w-7 h-7 rounded-md bg-graphite border border-white/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-3 h-3 text-metallic" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-mono text-white tracking-widest">{layer}</span>
                                                <span className="text-[9px] font-mono text-metallic/50">{desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
