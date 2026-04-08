"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <header className="absolute top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-sm transition-all duration-500 bg-white/10 border border-white/5 shadow-none"
            >
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-signal font-sans font-bold text-xl tracking-wide uppercase skew-x-[-5deg]">Integrate</span>
                </Link>

                <div className="hidden md:flex items-center space-x-10 text-xs text-metallic font-sans tracking-[0.1em] uppercase">
                    <Link href="/about" className="hover:text-signal transition-colors skew-x-[-5deg]">
                        About
                    </Link>

                    <Link href="/case-studies" className="hover:text-signal transition-colors skew-x-[-5deg]">
                        Case Studies
                    </Link>
                    
                    <Link href="/insights" className="hover:text-signal transition-colors skew-x-[-5deg]">
                        Insights
                    </Link>
                </div>

                <Link href="/contact" className="group relative px-6 py-2.5 bg-signal text-[#030405] rounded-sm font-sans text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] skew-x-[-5deg]">
                    <span className="relative z-10 flex items-center gap-2 skew-x-[5deg]">Book a call</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
            </nav>
        </header>
    );
}
