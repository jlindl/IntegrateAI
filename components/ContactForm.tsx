"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, CheckCircle2, Bot, Layout, Briefcase, Mail, User, ShieldCheck, Building2, Globe, Target, Clock, DollarSign, BrainCircuit, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const SERVICES = [
    { id: "automation", label: "AI & Automation", icon: Bot },
    { id: "web", label: "Web Design", icon: Layout },
    { id: "consulting", label: "Consulting", icon: Briefcase },
];

const AI_EXPERIENCE = [
    { id: "daily", label: "Using it daily" },
    { id: "tried", label: "Tried it a bit" },
    { id: "never", label: "Never used it" },
];

const TIMEFRAMES = [
    { id: "asap", label: "ASAP" },
    { id: "30_days", label: "Within 30 Days" },
    { id: "1_3_months", label: "1-3 Months" },
    { id: "exploring", label: "Just Exploring" },
];

const BUDGET_OPTIONS = [
    { id: "under_2k", label: "Under $2,000 / mo" },
    { id: "2k_5k", label: "$2,000 - $5,000 / mo" },
    { id: "5k_10k", label: "$5,000 - $10,000 / mo" },
    { id: "10k_plus", label: "$10,000+ / mo" },
    { id: "not_sure", label: "Not sure yet" },
];

export default function ContactForm() {
    const [step, setStep] = useState<Step>(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        businessName: "",
        industry: "",
        role: "",
        websiteUrl: "",
        hasNoWebsite: false,
        service: "",
        bottleneck: "",
        aiExperience: "",
        successVision: "",
        timeframe: "",
        budget: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Initial load animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    // Step transition animation
    useEffect(() => {
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current?.children || [],
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", clearProps: "all" }
            );
        });
        return () => ctx.revert();
    }, [step]);

    const nextStep = () => {
        if (step < 5) setStep((s) => (s + 1) as Step);
    };

    const prevStep = () => {
        if (step > 0 && step < 5) setStep((s) => (s - 1) as Step);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            // Validation per step before Enter works
            if (step === 0 && formData.name && formData.email.includes('@')) nextStep();
            if (step === 1 && formData.businessName && formData.industry && formData.role && (formData.websiteUrl || formData.hasNoWebsite)) nextStep();
            if (step === 2 && formData.service && formData.bottleneck) nextStep();
            if (step === 3 && formData.aiExperience && formData.successVision) nextStep();
            if (step === 4 && formData.timeframe) handleSubmit();
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(5);

            // Success animation
            gsap.fromTo(".success-icon",
                { scale: 0, rotation: -45 },
                { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
            );
        }, 1500);
    };

    // Calculate progress (5 steps total before success, so denominator is 4)
    const progressPercent = step < 5 ? (step / 4) * 100 : 100;

    return (
        <section className="relative min-h-screen w-full bg-[#030405] flex items-center justify-center p-6 md:p-12 overflow-hidden selection:bg-white/20">

            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"
                    alt="Dark Server Room Background"
                    fill
                    className="object-cover object-center opacity-[0.08] grayscale mix-blend-screen"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030405] via-[#030405]/90 to-[#030405]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-signal/5 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Navbar back link */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/" className="text-white/50 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                    <ArrowRight size={14} className="rotate-180" /> Back to Base
                </Link>
            </div>

            {/* Main Modal Container */}
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-3xl bg-[#0a0c0e]/80 backdrop-blur-2xl rounded-3xl p-8 md:p-14 border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-[500px] flex flex-col"
            >
                {/* Progress Bar (Hidden on success) */}
                {step < 5 && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-3xl overflow-hidden">
                        <div
                            className="h-full bg-signal transition-all duration-700 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                )}

                {/* Header Badge & Back Button */}
                {step < 5 && (
                    <div className="flex justify-between items-center mb-10">
                        <div /> {/* Empty div for flex layout balance */}

                        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/30 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                            <ShieldCheck size={12} className="text-signal/70" />
                            Secure Intake Protocol | Step {step + 1}/5
                        </div>
                    </div>
                )}

                {/* Form Content Area */}
                <div ref={contentRef} className="flex-1 flex flex-col justify-center">

                    {/* STEP 0: BASICS */}
                    {step === 0 && (
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight text-center mb-4">
                                Let&apos;s get acquainted.<br />Who are we speaking with?
                            </h2>
                            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                                    <input
                                        type="text"
                                        autoFocus
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Full Name"
                                        className="w-full bg-transparent border-b-2 border-white/10 hover:border-white/30 focus:border-signal text-white text-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Work Email Address"
                                        className="w-full bg-transparent border-b-2 border-white/10 hover:border-white/30 focus:border-signal text-white text-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.name || !formData.email.includes('@')}
                                    className="group relative px-8 py-3.5 bg-white text-[#030405] rounded-full font-sans text-sm font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: THE BUSINESS */}
                    {step === 1 && (
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight text-center mb-2">
                                Tell us about your organization.
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="space-y-6">
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input
                                            type="text"
                                            autoFocus
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            placeholder="Business Name"
                                            className="w-full bg-black/40 border border-white/10 focus:border-signal/50 text-white text-base rounded-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="Your Role / Title"
                                            className="w-full bg-black/40 border border-white/10 focus:border-signal/50 text-white text-base rounded-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="relative">
                                        <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input
                                            type="text"
                                            value={formData.industry}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            placeholder="Industry / Niche"
                                            className="w-full bg-black/40 border border-white/10 focus:border-signal/50 text-white text-base rounded-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                            <input
                                                type="url"
                                                disabled={formData.hasNoWebsite}
                                                value={formData.websiteUrl}
                                                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                                placeholder="Website URL"
                                                className="w-full bg-black/40 border border-white/10 focus:border-signal/50 disabled:opacity-30 text-white text-base rounded-xl px-12 py-4 outline-none transition-colors placeholder:text-white/20"
                                            />
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer group px-2">
                                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${formData.hasNoWebsite ? 'bg-signal border-signal' : 'border-white/20 group-hover:border-white/50 bg-transparent'}`}>
                                                {formData.hasNoWebsite && <CheckCircle2 size={12} className="text-black" />}
                                            </div>
                                            <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors font-sans">We don&apos;t have a website yet</span>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.hasNoWebsite}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, hasNoWebsite: e.target.checked, websiteUrl: e.target.checked ? "" : formData.websiteUrl });
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={prevStep}
                                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors p-2 -ml-2"
                                >
                                    <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.businessName || !formData.industry || !formData.role || (!formData.websiteUrl && !formData.hasNoWebsite)}
                                    className="group relative px-8 py-3.5 bg-white text-[#030405] rounded-full font-sans text-sm font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: THE GOAL */}
                    {step === 2 && (
                        <div className="flex flex-col gap-6 w-full">
                            <h2 className="text-3xl font-serif text-white tracking-tight leading-tight mb-2">
                                What brings you to Integrate?
                            </h2>

                            <div className="space-y-2">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1">Primary Focus</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                    {SERVICES.map((srv) => {
                                        const Icon = srv.icon;
                                        const isSelected = formData.service === srv.id;
                                        return (
                                            <button
                                                key={srv.id}
                                                onClick={() => setFormData({ ...formData, service: srv.id })}
                                                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${isSelected ? 'bg-white/5 border-signal shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/[0.02]'}`}
                                            >
                                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-signal/10 border-signal text-signal' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                                    <Icon size={14} />
                                                </div>
                                                <span className={`text-sm font-sans font-medium text-left ${isSelected ? 'text-white' : 'text-white/60'}`}>
                                                    {srv.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1">Current Bottleneck</label>
                                <textarea
                                    value={formData.bottleneck}
                                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                                    placeholder="What is the biggest operational or technical bottleneck holding back your growth right now?"
                                    className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-signal/50 text-white text-base p-5 rounded-xl outline-none transition-colors placeholder:text-white/20 min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={prevStep}
                                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors p-2 -ml-2"
                                >
                                    <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.service || !formData.bottleneck}
                                    className="group relative px-8 py-3.5 bg-white text-[#030405] rounded-full font-sans text-sm font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Next Block <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: AI CONTEXT & VISION */}
                    {step === 3 && (
                        <div className="flex flex-col gap-6 w-full">
                            <div className="space-y-2">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1 flex items-center gap-2">
                                    <BrainCircuit size={14} /> AI Experience Level
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                    {AI_EXPERIENCE.map((exp) => {
                                        const isSelected = formData.aiExperience === exp.id;
                                        return (
                                            <button
                                                key={exp.id}
                                                onClick={() => setFormData({ ...formData, aiExperience: exp.id })}
                                                className={`py-3 px-4 rounded-xl border text-sm font-sans transition-all duration-300 ${isSelected ? 'bg-signal/10 border-signal text-signal shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/40 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/[0.02]'}`}
                                            >
                                                {exp.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1">90-Day Vision</label>
                                <textarea
                                    value={formData.successVision}
                                    onChange={(e) => setFormData({ ...formData, successVision: e.target.value })}
                                    placeholder="If this project worked perfectly, what would success look like in 90 days? (Time saved, revenue gained, workflows shifted)"
                                    className="w-full bg-black/40 border border-white/10 hover:border-white/20 focus:border-signal/50 text-white text-base p-5 rounded-xl outline-none transition-colors placeholder:text-white/20 min-h-[140px] resize-none"
                                />
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={prevStep}
                                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors p-2 -ml-2"
                                >
                                    <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.aiExperience || !formData.successVision}
                                    className="group relative px-8 py-3.5 bg-white text-[#030405] rounded-full font-sans text-sm font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Final Step <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: TIMELINE & BUDGET */}
                    {step === 4 && (
                        <div className="flex flex-col gap-6 w-full">
                            <h2 className="text-3xl font-serif text-white tracking-tight leading-tight mb-2">
                                Final Logistics.
                            </h2>

                            <div className="space-y-2">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1 flex items-center gap-2">
                                    <Clock size={14} /> Implementation Timeline
                                </label>
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    {TIMEFRAMES.map((time) => {
                                        const isSelected = formData.timeframe === time.id;
                                        return (
                                            <button
                                                key={time.id}
                                                onClick={() => setFormData({ ...formData, timeframe: time.id })}
                                                className={`py-4 px-4 rounded-xl border text-sm font-sans transition-all duration-300 ${isSelected ? 'bg-signal/10 border-signal text-signal shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/40 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/[0.02]'}`}
                                            >
                                                {time.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-2 mt-4 relative z-20">
                                <label className="text-xs font-mono tracking-widest uppercase text-white/40 ml-1 flex items-center justify-between">
                                    <span className="flex items-center gap-2"><DollarSign size={14} /> Estimated Monthly Budget</span>
                                    <span className="text-white/20 text-[10px]">OPTIONAL</span>
                                </label>
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full flex items-center justify-between bg-black/40 border hover:border-white/20 px-5 py-4 rounded-xl outline-none transition-all ${isDropdownOpen ? 'border-signal/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/10 text-white/50'}`}
                                    >
                                        <span className={`text-base font-sans ${formData.budget ? 'text-white' : ''}`}>
                                            {formData.budget ? BUDGET_OPTIONS.find(o => o.id === formData.budget)?.label : "Select a range..."}
                                        </span>
                                        <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-signal" : "text-white/30"}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-[#0a0c0e] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {BUDGET_OPTIONS.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => {
                                                        setFormData({ ...formData, budget: opt.id });
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-5 py-3.5 text-sm font-sans transition-colors ${formData.budget === opt.id ? 'bg-signal/10 text-signal' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={prevStep}
                                    className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors p-2 -ml-2"
                                >
                                    <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!formData.timeframe || isSubmitting}
                                    className="group relative px-8 py-4 bg-signal text-black rounded-full font-sans text-sm font-bold overflow-hidden transition-all duration-400 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? "Transmitting..." : "Finish and book call"}
                                        {!isSubmitting && <CheckCircle2 size={16} className="group-hover:scale-110 transition-transform" />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: SUCCESS */}
                    {step === 5 && (
                        <div className="flex flex-col items-center justify-center gap-8 py-12">
                            <div className="w-20 h-20 rounded-full bg-signal/10 border border-signal/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center success-icon">
                                <CheckCircle2 size={32} className="text-signal" />
                            </div>
                            <div className="text-center space-y-4">
                                <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                                    Payload delivered.
                                </h2>
                                <p className="text-lg text-white/50 max-w-md mx-auto">
                                    We&apos;ve received your specs, {formData.name.split(' ')[0]}. Skip the wait and secure your strategy session right now.
                                </p>
                            </div>

                            <a
                                href="https://calendly.com/jacklindo31-fxmx/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-10 py-5 bg-signal text-black rounded-full font-sans text-base font-bold overflow-hidden transition-all duration-400 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center w-full max-w-sm mt-4"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Calendar size={18} /> Book Your Call Now
                                </span>
                                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                            </a>

                            <Link
                                href="/"
                                className="mt-4 text-xs font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                            >
                                Return to Base
                            </Link>
                        </div>
                    )}

                </div>
            </div>

        </section>
    );
}
