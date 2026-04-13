"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PartnerForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        referralGoals: ""
    });
    
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        
        try {
            const response = await fetch("/api/partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Submission failed");

            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="max-w-2xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="w-20 h-20 bg-signal/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-signal" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Application Received.</h3>
                <p className="text-metallic leading-relaxed mb-8">
                    We&apos;ve received your agency details. A member of our partnership team will review your profile and reach out within 48 hours to discuss the next steps.
                </p>
                <button 
                    onClick={() => setStatus("idle")}
                    className="text-signal font-mono text-[10px] uppercase tracking-[0.3em] hover:opacity-80 transition-opacity"
                >
                    Submit Another Application
                </button>
            </div>
        );
    }

    return (
        <section className="relative w-full max-w-4xl mx-auto px-6">
            <div className="bg-[#0a0c0e] border border-white/5 rounded-sm p-8 md:p-16 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="mb-12">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal/60 mb-4 block">Onboarding</span>
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Apply for the Pioneer Network.</h3>
                        <p className="text-metallic text-sm leading-relaxed max-w-lg">
                            Tell us a bit about your business and how you envision collaborating with Integrate. Every partner is manually vetted.
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">First Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Last Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Work Email</label>
                                <input 
                                    required 
                                    type="email" 
                                    placeholder="john@agency.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Phone Number</label>
                                <input 
                                    required 
                                    type="tel" 
                                    placeholder="+44 7700 900000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Agency / Company</label>
                            <input 
                                required 
                                type="text" 
                                placeholder="Growth Experts Ltd"
                                value={formData.companyName}
                                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Briefly describe your network and referral goals</label>
                            <textarea 
                                required
                                rows={3}
                                placeholder="We work with enterprise clients who often need complex automation infrastructure..."
                                value={formData.referralGoals}
                                onChange={(e) => setFormData({...formData, referralGoals: e.target.value})}
                                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-signal transition-colors font-sans text-sm resize-none"
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-red-400 text-xs font-mono uppercase tracking-widest">Submission failed. Please try again.</p>
                        )}

                        <button 
                            disabled={status === "submitting"}
                            type="submit" 
                            className="group relative w-full md:w-auto px-12 py-5 bg-white text-[#030405] rounded-sm font-sans text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {status === "submitting" ? "Syncing with GHL..." : "Join the Network"}
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
