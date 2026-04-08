"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import LinkButton from "../../components/LinkButton";
import { Mail, Linkedin, MessageCircle, Globe } from "lucide-react";

export default function LinksPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // 1. Initial background and logo reveal
            tl.fromTo(
                ".links-bg",
                { scale: 1.1, opacity: 0, filter: "brightness(0.2)" },
                { scale: 1, opacity: 1, filter: "brightness(0.4)", duration: 2.5 }
            );

            tl.fromTo(
                ".profile-section",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 },
                "-=2"
            );

            // 2. Buttons reveal
            tl.fromTo(
                ".link-item",
                { y: 30, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)" },
                "-=1"
            );

            // 3. Footer tag reveal
            tl.fromTo(
                ".footer-tag",
                { opacity: 0 },
                { opacity: 1, duration: 1.5 },
                "-=0.5"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="relative w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-24 px-6 overflow-hidden selection:bg-black/5 selection:text-black">
            
            {/* Minimalist Background Accents */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
                <div className="absolute bottom-0 w-full h-[30vh] bg-[linear-gradient(to_top,rgba(0,0,0,0.01)_0%,transparent_100%)]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
                
                <div className="profile-section flex flex-col items-center mb-16 text-center">
                    <div className="relative w-32 h-32 md:w-44 md:h-44 mb-[-1.5rem] md:mb-[-2rem] z-20 transform-gpu transition-transform duration-700 hover:rotate-[5deg]">
                        <Image 
                            src="/logo.png" 
                            alt="Integrate Logo" 
                            fill 
                            className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.15)]" 
                            priority 
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tight">
                            Integrate <span className="italic font-extrabold text-black">AI.</span>
                        </h1>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-8 bg-black/10" />
                            <p className="text-[10px] font-mono text-black/50 tracking-[0.4em] uppercase">
                                Digital Architecture
                            </p>
                            <div className="h-px w-8 bg-black/10" />
                        </div>
                    </div>
                </div>

                {/* Link Buttons List */}
                <div className="flex flex-col w-full gap-5 items-center">
                    <div className="link-item w-full flex justify-center">
                        <LinkButton 
                            href="/contact" 
                            icon={<Mail size={24} />} 
                            label="Start a Project" 
                            variant="light"
                        />
                    </div>
                    <div className="link-item w-full flex justify-center">
                        <LinkButton 
                            href="https://linkedin.com/company/integrate-solutions" 
                            icon={<Linkedin size={24} />} 
                            label="LinkedIn Profile" 
                            isExternal 
                            variant="light"
                        />
                    </div>
                    <div className="link-item w-full flex justify-center">
                        <LinkButton 
                            href="https://wa.me/yourwhatsapplink" 
                            icon={<MessageCircle size={24} />} 
                            label="WhatsApp Us" 
                            isExternal 
                            variant="light"
                        />
                    </div>
                    <div className="link-item w-full flex justify-center">
                        <LinkButton 
                            href="/" 
                            icon={<Globe size={24} />} 
                            label="View Full Website" 
                            variant="light"
                        />
                    </div>
                </div>

                {/* Bottom Footer Section */}
                <div className="footer-tag mt-24 flex flex-col items-center gap-10">
                    <div className="flex items-center gap-4 bg-white border border-black/[0.04] px-7 py-3.5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.04)]">
                        <div className="relative flex items-center justify-center w-2 h-2">
                            <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-40"></div>
                            <div className="relative w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                        </div>
                        <span className="font-mono text-[9px] text-black/60 tracking-[0.25em] uppercase font-bold">Currently Accepting Clients</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[9px] font-mono text-black/20 tracking-[0.1em] uppercase">
                            Premium AI Automation & Web Development
                        </p>
                        <p className="text-[9px] font-mono text-black/10 tracking-[0.05em] uppercase">
                            © {new Date().getFullYear()} Integrate Operations LLC
                        </p>
                    </div>
                </div>
            </div>

            {/* Ambient Background Noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </main>
    );
}
