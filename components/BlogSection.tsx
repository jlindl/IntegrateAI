"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
    {
        id: "insight-01",
        category: "Strategy",
        title: "The Fallacy of 'Plug & Play' AI: Why Bespoke Architecture Wins",
        excerpt: "Off-the-shelf tools fail when complexity scales. Discover why deeply integrated, custom AI systems are the only viable path to enterprise automation.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        readTime: "6 Min Read"
    },
    {
        id: "insight-02",
        category: "Case Study",
        title: "Automating Revenue: How 3 Enterprises Scaled with AI Agents",
        excerpt: "An inside look at the exact autonomous architectures that eliminated manual CRM entry and accelerated sales cycles by 40%.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        readTime: "8 Min Read"
    },
    {
        id: "insight-03",
        category: "Engineering",
        title: "Beyond the LLM: Engineering Robust Multi-Agent Systems",
        excerpt: "A technical deep dive into orchestration layers, structured outputs, and preventing hallucinations in mission-critical deployments.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop",
        readTime: "12 Min Read"
    }
];

export default function BlogSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full pt-24 pb-32 bg-[#030405] text-signal overflow-hidden border-t border-metallic/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-xl">
                        <span className="font-mono text-[10px] text-metallic tracking-[0.3em] uppercase flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 bg-signal shadow-[0_0_12px_rgba(255,255,255,0.8)] skew-x-[-15deg]"></span>
                            Signal & Noise
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-signal leading-[1.1] tracking-tight">
                            Engineering <span className="metallic-gradient-text italic font-bold">Insights.</span>
                        </h2>
                    </div>
                    
                    <Link href="#" className="group flex items-center gap-3 text-sm font-sans font-bold tracking-widest text-metallic hover:text-signal uppercase transition-colors skew-x-[-5deg]">
                        <span className="skew-x-[5deg]">View Journal</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="skew-x-[5deg] group-hover:translate-x-1 transition-transform">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                    {ARTICLES.map((article, index) => (
                        <Link 
                            href="#" 
                            key={article.id}
                            ref={el => { cardsRef.current[index] = el }}
                            className="group relative flex flex-col h-full bg-[#0a0c0e]/80 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2"
                        >
                            <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-white/5 bg-black">
                                <Image 
                                    src={article.image} 
                                    alt={article.title} 
                                    fill 
                                    className="object-cover opacity-60 saturate-[0.2] contrast-[1.1] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100 group-hover:opacity-90"
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-white shadow-lg">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col flex-1 p-6 lg:p-8">
                                <h3 className="text-xl md:text-2xl font-serif leading-snug tracking-tight mb-4 group-hover:text-white transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-metallic/70 text-sm leading-relaxed mb-8 flex-1">
                                    {article.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <span className="font-mono text-[10px] text-metallic tracking-widest uppercase">
                                        {article.readTime}
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 text-metallic group-hover:text-signal group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
