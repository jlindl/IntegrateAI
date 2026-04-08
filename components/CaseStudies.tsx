"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Zap, ArrowRight, Database, Mail, MessageSquare,
    BarChart3, Users, Clock, TrendingUp, CheckCircle2,
    FileText, Filter, Bot, Bell, CreditCard, LayoutGrid, List
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const CASES = [
    {
        id: 0,
        label: "01",
        client: "B2B SaaS Platform",
        industry: "Software",
        stack: ["HubSpot", "Clay", "GPT-4", "Instantly", "Slack"],
        deployTime: "12 days",
        headline: "Lead-to-booked-call in under 4 minutes",
        problem:
            "Manual SDR team spending 60% of time on qualification. Leads going cold. 3-day average response time killing conversion.",
        outcome: {
            primary: "340%",
            primaryLabel: "Pipeline increase",
            secondary: "£48K",
            secondaryLabel: "Annual labour saved",
            tertiary: "4 min",
            tertiaryLabel: "Avg response time",
        },
        steps: [
            {
                phase: "TRIGGER",
                label: "Lead submits Typeform",
                detail: "Webhook fires on form submit — zero delay",
                icon: FileText,
                saves: "Manual intake eliminated",
                color: "text-white",
            },
            {
                phase: "ENRICH",
                label: "Clay pulls firmographic data",
                detail: "LinkedIn, Apollo, Clearbit enrichment in parallel",
                icon: Database,
                saves: "2h/week of manual research",
                color: "text-white/80",
            },
            {
                phase: "SCORE",
                label: "GPT-4 ICP qualification",
                detail: "Custom prompt scores fit 1–10 against ICP criteria",
                icon: Bot,
                saves: "100% of SDR pre-qual time",
                color: "text-white/80",
            },
            {
                phase: "ROUTE",
                label: "Smart SDR assignment",
                detail: "Round-robin with territory + seniority weighting",
                icon: Filter,
                saves: "Manual triage eliminated",
                color: "text-white/70",
            },
            {
                phase: "SEQUENCE",
                label: "Personalised outreach sent",
                detail: "GPT-4 writes email using enrichment context",
                icon: Mail,
                saves: "45 min/lead writing time",
                color: "text-white/70",
            },
            {
                phase: "NOTIFY",
                label: "Slack alert to AE",
                detail: "Full lead context + ICP score sent to AE channel",
                icon: Bell,
                saves: "CRM context-switching loop",
                color: "text-white/60",
            },
            {
                phase: "CRM",
                label: "HubSpot deal auto-created",
                detail: "Stage, owner, source, score — all populated",
                icon: BarChart3,
                saves: "15 min/deal of data entry",
                color: "text-white/60",
            },
        ],
    },
    {
        id: 1,
        label: "02",
        client: "E-Commerce Brand",
        industry: "Retail",
        stack: ["Shopify", "Klaviyo", "Make.com", "GPT-4", "Gorgias"],
        deployTime: "8 days",
        headline: "£0 labour cost on 90% of customer support",
        problem:
            "Support team drowning in repetitive tickets. 48h avg response time. High churn from poor post-purchase experience.",
        outcome: {
            primary: "91%",
            primaryLabel: "Tickets auto-resolved",
            secondary: "£62K",
            secondaryLabel: "Support cost saved",
            tertiary: "< 2 min",
            tertiaryLabel: "Avg resolution time",
        },
        steps: [
            {
                phase: "TRIGGER",
                label: "Customer submits support ticket",
                detail: "Gorgias webhook fires on new conversation",
                icon: MessageSquare,
                saves: "Queue triage eliminated",
                color: "text-white",
            },
            {
                phase: "CLASSIFY",
                label: "GPT-4 intent detection",
                detail: "Classifies: returns, tracking, complaints, billing",
                icon: Bot,
                saves: "Manual categorisation removed",
                color: "text-white/80",
            },
            {
                phase: "FETCH",
                label: "Order data pulled from Shopify",
                detail: "Order status, fulfilment, tracking in real time",
                icon: Database,
                saves: "Agent lookup time eliminated",
                color: "text-white/80",
            },
            {
                phase: "RESPOND",
                label: "Personalised reply generated",
                detail: "Context-aware response with order specifics",
                icon: Mail,
                saves: "8 min/ticket writing time",
                color: "text-white/70",
            },
            {
                phase: "ESCALATE",
                label: "Complex cases flagged to human",
                detail: "Sentiment score triggers human handoff with context",
                icon: Users,
                saves: "Blind escalation rework removed",
                color: "text-white/70",
            },
            {
                phase: "FLOW",
                label: "Post-resolution Klaviyo sequence",
                detail: "Win-back or upsell flow triggered by resolution type",
                icon: TrendingUp,
                saves: "Manual flow enrollment",
                color: "text-white/60",
            },
        ],
    },
    {
        id: 2,
        label: "03",
        client: "Professional Services Firm",
        industry: "Consulting",
        stack: ["Notion", "Make.com", "Stripe", "GPT-4", "Slack"],
        deployTime: "14 days",
        headline: "Client onboarding from 5 days to 4 hours",
        problem:
            "Onboarding was manual, inconsistent, and scattered. Contracts, payments, and kickoff scheduling done by hand across 6 tools.",
        outcome: {
            primary: "96%",
            primaryLabel: "Faster onboarding",
            secondary: "£31K",
            secondaryLabel: "Operations time saved/yr",
            tertiary: "4 hrs",
            tertiaryLabel: "Full onboarding cycle",
        },
        steps: [
            {
                phase: "TRIGGER",
                label: "Deal marked closed-won in CRM",
                detail: "Stage change webhook fires instantly",
                icon: CheckCircle2,
                saves: "Manual trigger eliminated",
                color: "text-white",
            },
            {
                phase: "CONTRACT",
                label: "DocuSign contract generated",
                detail: "Template populated with deal data, sent automatically",
                icon: FileText,
                saves: "2h contract prep per client",
                color: "text-white/80",
            },
            {
                phase: "PAYMENT",
                label: "Stripe invoice auto-sent",
                detail: "Deposit invoice created and delivered on signing",
                icon: CreditCard,
                saves: "Manual invoice creation",
                color: "text-white/80",
            },
            {
                phase: "PROVISION",
                label: "Notion client workspace built",
                detail: "Full project workspace cloned from master template",
                icon: Database,
                saves: "3h setup per engagement",
                color: "text-white/70",
            },
            {
                phase: "SCHEDULE",
                label: "Kickoff meeting auto-booked",
                detail: "Calendly link + agenda sent via personalised email",
                icon: Clock,
                saves: "Back-and-forth scheduling",
                color: "text-white/70",
            },
            {
                phase: "NOTIFY",
                label: "Team Slack channel provisioned",
                detail: "Channel created, client intro posted with context pack",
                icon: Bell,
                saves: "Manual comms coordination",
                color: "text-white/60",
            },
        ],
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ROICounter({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-none">
                {value}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                {label}
            </span>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CaseStudies() {
    const [activeCase, setActiveCase] = useState(0);
    const [revealedSteps, setRevealedSteps] = useState(0);
    const [viewMode, setViewMode] = useState<"stack" | "blueprint">("stack");
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const roiRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const connectorRefs = useRef<(HTMLDivElement | null)[]>([]);

    const cs = CASES[activeCase];

    // Single effect that resets + animates whenever case changes.
    // Uses rAF to wait one frame so refs are populated after React re-render.
    useEffect(() => {
        setRevealedSteps(0);

        let rafId: number;
        let ctx: ReturnType<typeof gsap.context>;

        rafId = requestAnimationFrame(() => {
            const steps = stepsRef.current.filter((el): el is HTMLDivElement => el !== null);
            const connectors = connectorRefs.current.filter((el): el is HTMLDivElement => el !== null);

            ctx = gsap.context(() => {
                // Set all steps invisible immediately so fromTo has clean state
                gsap.set(steps, { opacity: 0, x: -24 });
                gsap.set(connectors, { scaleY: 0, transformOrigin: "top" });

                // Header
                if (headerRef.current) {
                    gsap.fromTo(
                        headerRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
                    );
                }

                // ROI panel
                if (roiRef.current) {
                    gsap.fromTo(
                        roiRef.current,
                        { opacity: 0, x: 30 },
                        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.15 }
                    );
                }

                // Steps: staggered cascade — no ScrollTrigger needed on a dedicated page
                steps.forEach((step, i) => {
                    gsap.to(step, {
                        opacity: 1,
                        x: 0,
                        duration: 0.45,
                        ease: "power3.out",
                        delay: 0.08 + 0.1 * i,
                        onComplete: () => setRevealedSteps((r) => Math.max(r, i + 1)),
                    });
                });

                // Connectors draw in just after each step
                connectors.forEach((connector, i) => {
                    gsap.to(connector, {
                        scaleY: 1,
                        duration: 0.35,
                        ease: "power2.out",
                        delay: 0.22 + 0.1 * i,
                    });
                });
            });
        });

        return () => {
            cancelAnimationFrame(rafId);
            ctx?.revert();
        };
    }, [activeCase]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#030405] text-white py-32 px-6 md:px-12 overflow-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">

                {/* ── Section header ── */}
                <div className="mb-16">
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/30 mb-4">
                        Results Archive
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif text-white leading-[0.95] mb-6">
                        What we<br />
                        <span className="italic text-white/50">actually built.</span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base max-w-md leading-relaxed">
                        Real workflows. Real automations. Exact tools, exact logic, exact ROI — documented to the step.
                    </p>
                </div>

                {/* ── Case tabs ── */}
                <div className="flex gap-2 mb-12 flex-wrap">
                    {CASES.map((c, i) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCase(i)}
                            className={`group flex items-center gap-3 px-5 py-3 border rounded-sm font-mono text-xs tracking-widest uppercase transition-all duration-300 ${activeCase === i
                                ? "bg-white text-[#030405] border-white"
                                : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white/70"
                                }`}
                        >
                            <span>{c.label}</span>
                            <span className="hidden md:inline">{c.client}</span>
                        </button>
                    ))}
                </div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

                    {/* Left: Stack trace */}
                    <div>
                        {/* Case meta header */}
                        <div ref={headerRef} className="mb-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="font-mono text-xs tracking-widest uppercase text-white/30 border border-white/10 px-3 py-1 rounded-sm">
                                        {cs.industry}
                                    </span>
                                    <span className="font-mono text-xs tracking-widest uppercase text-white/30 border border-white/10 px-3 py-1 rounded-sm">
                                        Deployed in {cs.deployTime}
                                    </span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {cs.stack.map((tool) => (
                                            <span key={tool} className="font-mono text-[10px] text-white/20 tracking-wider">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex bg-[#0a0c0e] p-1 rounded-sm border border-white/10 w-fit">
                                    <button
                                        onClick={() => setViewMode("stack")}
                                        className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all ${viewMode === "stack" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                                    >
                                        <List size={12} /> Stack
                                    </button>
                                    <button
                                        onClick={() => setViewMode("blueprint")}
                                        className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all ${viewMode === "blueprint" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
                                    >
                                        <LayoutGrid size={12} /> Blueprint
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">
                                {cs.headline}
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xl">
                                {cs.problem}
                            </p>
                        </div>

                        {/* Content Area */}
                        <div className="relative">
                            {viewMode === "stack" ? (
                                // VERTICAL STACK TRACE VIEW
                                <div className="relative">
                                    {cs.steps.map((step, i) => {
                                        const Icon = step.icon;
                                        const isRevealed = i < revealedSteps;
                                        return (
                                            <div key={`${activeCase}-${i}`} className="relative">
                                                <div
                                                    ref={(el) => { stepsRef.current[i] = el; }}
                                                    className="flex items-start gap-5 group"
                                                >
                                                    {/* Left rail: icon + connector */}
                                                    <div className="flex flex-col items-center shrink-0 w-10">
                                                        <div
                                                            className={`w-10 h-10 rounded-sm border flex items-center justify-center transition-all duration-500 ${isRevealed
                                                                ? "bg-white/5 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                                                : "bg-transparent border-white/5"
                                                                }`}
                                                        >
                                                            <Icon size={14} className={isRevealed ? "text-white" : "text-white/20"} />
                                                        </div>
                                                        {/* Connector line */}
                                                        {i < cs.steps.length - 1 && (
                                                            <div
                                                                ref={(el) => { connectorRefs.current[i] = el; }}
                                                                className="w-px flex-1 min-h-[32px] bg-gradient-to-b from-white/20 to-white/5 origin-top scale-y-0"
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Right: content */}
                                                    <div className="flex-1 pb-8">
                                                        <div className="flex flex-wrap items-start gap-3 mb-2">
                                                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/25 border border-white/8 px-2 py-0.5 rounded-sm shrink-0">
                                                                {step.phase}
                                                            </span>
                                                            <span className="text-sm font-sans text-white font-medium leading-tight">
                                                                {step.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-white/40 leading-relaxed mb-2.5">
                                                            {step.detail}
                                                        </p>
                                                        {/* Saves badge */}
                                                        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-white/30 border border-white/8 px-2.5 py-1 rounded-sm">
                                                            <Zap size={9} className="text-white/40" />
                                                            {step.saves}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Terminal node */}
                                    <div className="flex items-center gap-5 mt-2">
                                        <div className="w-10 flex justify-center">
                                            <div className="w-3 h-3 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.5)] animate-pulse" />
                                        </div>
                                        <span className="font-mono text-xs tracking-widest uppercase text-white/50">
                                            System live — running 24/7
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                // HORIZONTAL BLUEPRINT VIEW
                                <div className="relative w-full overflow-x-auto pb-8 pt-4 custom-scrollbar">
                                    <div className="flex items-center min-w-max px-2">
                                        {cs.steps.map((step, i) => {
                                            const Icon = step.icon;
                                            const isRevealed = i < revealedSteps;
                                            return (
                                                <div key={`bp-${activeCase}-${i}`} className="flex items-center group">
                                                    {/* Node */}
                                                    <div className={`relative flex flex-col items-center w-52 p-5 rounded-lg border transition-all duration-500 bg-[#0a0c0e]/80 backdrop-blur-md ${isRevealed ? "border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.03)]" : "border-white/5 opacity-40 grayscale"}`}>
                                                        <div className={`w-12 h-12 rounded-full border mb-4 flex items-center justify-center transition-all ${isRevealed ? "bg-white/5 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "bg-transparent border-white/10 text-white/20"}`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-2">{step.phase}</span>
                                                        <span className="text-sm font-sans text-center text-white/90 leading-tight mb-4 min-h-[40px] flex items-center">{step.label}</span>
                                                        <div className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#030405] bg-white px-2.5 py-1.5 rounded-sm w-full justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                            <Zap size={10} className="text-[#030405]/70" />
                                                            <span className="truncate font-bold">{step.saves}</span>
                                                        </div>
                                                    </div>

                                                    {/* Horizontal Connection Line */}
                                                    {i < cs.steps.length - 1 && (
                                                        <div className="w-16 h-px relative flex items-center">
                                                            <div className={`w-full h-full transition-all duration-1000 ${isRevealed ? "bg-gradient-to-r from-white/30 to-white/10" : "bg-white/5"}`} />
                                                            {isRevealed && (
                                                                <div className="absolute left-0 w-6 h-px bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-[ping_1.5s_infinite_linear]" style={{ animationDirection: "normal" }} />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {/* Terminal Node Blueprint */}
                                        <div className="flex items-center ml-8 opacity-70">
                                            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
                                            <div className="ml-4 font-mono text-[10px] tracking-widest uppercase text-white/40 w-24">Live Data Stream</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: ROI Panel */}
                    <div ref={roiRef} className="lg:sticky lg:top-32 opacity-0">

                        {/* Outcome metrics */}
                        <div className="bg-[#0a0c0e] border border-white/8 rounded-sm p-8 mb-4">
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25 mb-8">
                                Measured Outcomes
                            </p>
                            <div className="flex flex-col gap-8">
                                <ROICounter value={cs.outcome.primary} label={cs.outcome.primaryLabel} />
                                <div className="w-full h-px bg-white/5" />
                                <ROICounter value={cs.outcome.secondary} label={cs.outcome.secondaryLabel} />
                                <div className="w-full h-px bg-white/5" />
                                <ROICounter value={cs.outcome.tertiary} label={cs.outcome.tertiaryLabel} />
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="bg-[#0a0c0e] border border-white/8 rounded-sm p-6 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/25">
                                    Automation Coverage
                                </span>
                                <span className="font-mono text-xs text-white/50">
                                    {revealedSteps}/{cs.steps.length} steps
                                </span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white/60 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                    style={{ width: `${(revealedSteps / cs.steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="group w-full flex items-center justify-between px-6 py-4 bg-white text-[#030405] rounded-sm font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all duration-200">
                            <span>Get a free audit</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>

                {/* ── Aggregate stats bar ── */}
                <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "47,832", label: "Hours automated" },
                        { value: "£2.1M", label: "Labour costs returned" },
                        { value: "< 4 min", label: "Avg trigger-to-action" },
                        { value: "99.4%", label: "Uptime across systems" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-2">
                            <span className="text-2xl md:text-3xl font-serif text-white">{stat.value}</span>
                            <span className="text-xs font-mono tracking-widest uppercase text-white/25">{stat.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
