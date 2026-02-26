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

            // Scroll style toggle without React state
            ScrollTrigger.create({
                start: "top -50",
                end: 99999,
                onEnter: () => {
                    if (navRef.current) {
                        navRef.current.classList.add("bg-[#030405]/80", "shadow-[0_10px_30px_rgba(0,0,0,0.8)]", "backdrop-blur-xl", "border-metallic/10");
                        navRef.current.classList.remove("bg-transparent", "border-transparent", "shadow-none");
                    }
                },
                onLeaveBack: () => {
                    if (navRef.current) {
                        navRef.current.classList.remove("bg-[#030405]/80", "shadow-[0_10px_30px_rgba(0,0,0,0.8)]", "backdrop-blur-xl", "border-metallic/10");
                        navRef.current.classList.add("bg-transparent", "border-transparent", "shadow-none");
                    }
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-sm transition-all duration-500 bg-transparent border border-transparent shadow-none"
            >
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="relative w-8 h-8 rounded-sm overflow-hidden flex items-center justify-center">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-signal font-sans font-bold text-lg tracking-wide uppercase skew-x-[-5deg]">Integrate</span>
                </Link>

                <div className="hidden md:flex items-center space-x-10 text-xs text-metallic font-sans tracking-[0.1em] uppercase">
                    <Link href="#platform" className="hover:text-signal transition-colors skew-x-[-5deg]">
                        About
                    </Link>

                    <Link href="#process" className="hover:text-signal transition-colors skew-x-[-5deg]">
                        Case Studies
                    </Link>
                    <Link href="/web-design" className="hover:text-signal transition-colors skew-x-[-5deg] border border-signal/20 px-3 py-1 rounded-sm">
                        Web Design
                    </Link>
                </div>

                <button className="group relative px-6 py-2.5 bg-signal text-[#030405] rounded-sm font-sans text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] skew-x-[-5deg]">
                    <span className="relative z-10 flex items-center gap-2 skew-x-[5deg]">Book a call</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </button>
            </nav>
        </header>
    );
}
