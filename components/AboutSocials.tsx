"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, MessageCircle, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    {
        name: "LinkedIn",
        handle: "@integrate-tech",
        description: "B2B insights, automation case studies, and engineering updates.",
        icon: <Linkedin size={32} />,
        href: "https://linkedin.com/company/integrate-tech",
        color: "hover:text-[#0077B5]",
    },
    {
        name: "WhatsApp",
        handle: "Direct Connect",
        description: "Instant access to our strategy team for ongoing project support.",
        icon: <MessageCircle size={32} />,
        href: "https://wa.me/447361591339",
        color: "hover:text-[#25D366]",
    },
    {
        name: "X (Twitter)",
        handle: "@IntegrateAI",
        description: "Real-time updates on our latest AI research and technical breakthroughs.",
        icon: <Twitter size={32} />,
        href: "https://x.com/integrateai",
        color: "hover:text-[#1DA1F2]",
    },
    {
        name: "Instagram",
        handle: "@integrate_tech",
        description: "Behind-the-scenes look at our digital architecture and design process.",
        icon: <Instagram size={32} />,
        href: "https://www.instagram.com/integrate_tech/",
        color: "hover:text-[#E4405F]",
    },
];

export default function AboutSocials() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            gsap.fromTo(
                ".social-header",
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                }
            );

            // Card staggered entrance
            gsap.fromTo(
                ".social-card",
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    scrollTrigger: { trigger: ".social-grid", start: "top 80%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: "power4.out",
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 md:py-48 bg-[#050607] overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <span className="social-header font-mono text-xs text-metallic uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        Connect
                    </span>
                    <h2 className="social-header text-3xl md:text-5xl lg:text-6xl font-serif text-signal mt-4">
                        Follow our <span className="metallic-gradient-text italic font-bold">Journey.</span>
                    </h2>
                    <p className="social-header text-base md:text-lg text-metallic/60 font-sans mt-4 max-w-xl leading-relaxed">
                        Join our digital ecosystem. We share technical research, operational insights, and architectural breakthroughs across our network.
                    </p>
                </div>

                {/* Social Grid */}
                <div className="social-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SOCIALS.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card group relative aspect-square md:aspect-[4/5] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden border border-white/5 bg-[#0A0C0E]/50 backdrop-blur-sm hover:border-white/20 transition-all duration-500 transform-gpu"
                        >
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            {/* Icon & External Link Indicator */}
                            <div className="flex justify-between items-start relative z-10">
                                <div className={`text-metallic transition-all duration-500 group-hover:scale-110 ${social.color}`}>
                                    {social.icon}
                                </div>
                                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-metallic group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <span className="block font-mono text-[10px] text-metallic/40 uppercase tracking-[0.2em] mb-3 group-hover:text-metallic/60 transition-colors">
                                    {social.handle}
                                </span>
                                <h3 className="text-xl md:text-2xl font-serif text-signal mb-4">
                                    {social.name}
                                </h3>
                                <p className="text-sm text-metallic/50 leading-relaxed group-hover:text-metallic/80 transition-colors">
                                    {social.description}
                                </p>
                            </div>

                            {/* Border Glow for Mobile */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
