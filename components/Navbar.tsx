"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.8,
                ease: "power4.out",
            });
            gsap.fromTo(
                menuLinksRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
            );
        } else {
            document.body.style.overflow = "auto";
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.6,
                ease: "power4.in",
            });
        }
    }, [isMenuOpen]);

    return (
        <header className="absolute top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-sm transition-all duration-500 bg-white/10 border border-white/5 shadow-none backdrop-blur-md"
            >
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50">
                    <div className="relative w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-signal font-sans font-bold text-xl tracking-wide uppercase skew-x-[-5deg]">Integrate</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10 text-xs text-metallic font-sans tracking-[0.1em] uppercase">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.name} href={link.href} className="hover:text-signal transition-colors skew-x-[-5deg]">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/contact" className="hidden md:block group relative px-6 py-2.5 bg-signal text-[#030405] rounded-sm font-sans text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] skew-x-[-5deg]">
                        <span className="relative z-10 flex items-center gap-2 skew-x-[5deg]">Book a call</span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </Link>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-signal hover:bg-white/5 rounded-sm transition-colors z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div 
                ref={menuRef}
                className="fixed inset-0 bg-deep-carbon/98 backdrop-blur-2xl z-40 md:hidden translate-x-full pointer-events-auto"
            >
                <div className="flex flex-col h-full pt-40 px-10">
                    <div className="flex flex-col space-y-8">
                        {NAV_LINKS.map((link, i) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                ref={el => { menuLinksRef.current[i] = el }}
                                className="text-4xl font-serif text-metallic hover:text-signal transition-all duration-300 tracking-tight"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pb-20">
                        <Link 
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="group flex items-center justify-between w-full p-6 bg-signal/10 border border-signal/20 rounded-sm transition-all hover:bg-signal/20"
                        >
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-metallic mb-2">Ready to automate?</span>
                                <span className="text-xl font-serif text-signal italic">Book Strategic Intake</span>
                            </div>
                            <ArrowRight className="text-signal group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                    
                    {/* Artistic background noise or shapes */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-signal/5 blur-[100px] rounded-full pointer-events-none" />
                </div>
            </div>
        </header>
    );
}
