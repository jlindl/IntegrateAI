"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Network, Cpu, Link as LinkIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MODULE_DATA = [
    {
        id: "MOD_01",
        title: "Workflow Automation",
        icon: Network,
        desc: "Stop wasting time on manual data entry. We engineer custom workflows that reclaim thousands of hours for your organization.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" // Dashboard/Analytics
    },
    {
        id: "MOD_02",
        title: "Bespoke AI Agents",
        icon: Cpu,
        desc: "Every agent is custom-trained for your business. We map directly to your standard operating procedures and scale them indefinitely.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" // Code on dark screen
    },
    {
        id: "MOD_03",
        title: "System Integration",
        icon: LinkIcon,
        desc: "Seamlessly connected. We bridge your entire tech stack, ensuring your data flows freely between platforms without manual intervention.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2670&auto=format&fit=crop" // Network / Cyber Security Nodes
    }
];

export default function ValueEngine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);
    const rightColumnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run sticky scroll on desktop to avoid weird mobile scrolling issues
        const isDesktop = window.innerWidth >= 768;

        const ctx = gsap.context(() => {
            if (isDesktop) {
                // Pin the left side while the right side scrolls
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: leftColumnRef.current,
                    pinSpacing: false,
                });
            }

            // Animate images changing opacities based on text scroll
            const texts = gsap.utils.toArray<HTMLElement>(".feature-text");
            const images = gsap.utils.toArray<HTMLElement>(".feature-img");

            texts.forEach((text, i) => {
                ScrollTrigger.create({
                    trigger: text,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => activate(i),
                    onEnterBack: () => activate(i),
                });
            });

            function activate(index: number) {
                if (isDesktop) {
                    images.forEach((img, i) => {
                        gsap.to(img, { opacity: i === index ? 1 : 0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
                        if (i === index) {
                            gsap.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "power2.out", overwrite: "auto" });
                        }
                    });
                }
                texts.forEach((text, i) => {
                    gsap.to(text, { opacity: i === index ? 1 : 0.2, duration: 0.5, overwrite: "auto" });
                });
            }

            // Init state
            activate(0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="engine" className="relative w-full bg-[#030405] text-signal overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metallic/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">

                {/* Pinned Left Column (Images) */}
                <div ref={leftColumnRef} className="hidden md:flex w-1/2 h-screen items-center justify-center relative py-[15vh] pr-12 lg:pr-20 z-0">
                    <div className="w-full h-full rounded-sm overflow-hidden relative border border-[#1a1c23] shadow-[0_0_50px_rgba(255,255,255,0.02)] bg-black clip-path-polygon">
                        {MODULE_DATA.map((mod, i) => (
                            <Image
                                key={mod.id}
                                src={mod.image}
                                alt={mod.title}
                                fill
                                className="feature-img object-cover opacity-0 grayscale contrast-[1.1] mix-blend-luminosity brightness-75 will-change-transform will-change-[opacity] transform-gpu"
                                priority={i === 0}
                            />
                        ))}
                    </div>
                </div>

                {/* Scrolling Right Column (Text) */}
                <div ref={rightColumnRef} className="w-full md:w-1/2 pt-[15vh] pb-[40vh] relative z-10">
                    <div className="mb-[20vh]">
                        <p className="font-mono text-[10px] text-metallic tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-signal shadow-[0_0_12px_rgba(255,255,255,0.9)] skew-x-[-20deg]"></span>
                            Agency Capabilities
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-signal leading-[1.1] tracking-tight mb-6">
                            Bespoke systems. <br /> <span className="metallic-gradient-text italic font-bold">Infinite scale.</span>
                        </h2>
                        <p className="text-metallic font-sans text-lg max-w-md leading-relaxed">
                            We partner with ambitious teams to replace inefficient manual processes with intelligent, custom-built AI architectures.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-8 group inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 text-signal border border-white/10 rounded-sm font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/25 skew-x-[-5deg]"
                        >
                            <span className="skew-x-[5deg] flex items-center gap-2">
                                Explore Capabilities
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="group-hover:translate-x-1 transition-transform">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-[35vh]">
                        {MODULE_DATA.map((mod) => (
                            <div key={mod.id} className="feature-text flex flex-col items-start opacity-20 transition-opacity duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs text-metallic/40 uppercase tracking-[0.2em]">{mod.id}</span>
                                    <div className="h-px w-12 bg-metallic/20" />
                                </div>

                                <div className="w-16 h-16 bg-[#0a0c0e] border border-[#1a1c23] flex items-center justify-center mb-8 shadow-inner skew-x-[-5deg]">
                                    <mod.icon size={28} className="text-signal skew-x-[5deg]" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-sans font-bold mb-5 tracking-tight">{mod.title}</h3>
                                <p className="text-metallic font-sans text-lg tracking-wide leading-relaxed max-w-sm">
                                    {mod.desc}
                                </p>

                                {/* Mobile Only Image */}
                                <div className="md:hidden w-full h-[60vh] rounded-sm overflow-hidden relative mt-12 border border-[#1a1c23]">
                                    <Image
                                        src={mod.image}
                                        alt={mod.title}
                                        fill
                                        className="object-cover grayscale contrast-[1.1] mix-blend-luminosity brightness-75"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
