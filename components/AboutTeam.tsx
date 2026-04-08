"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "James Lindley",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
    },
    {
        name: "Sarah Chen",
        role: "Head of AI Engineering",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    },
    {
        name: "Marcus Rivera",
        role: "Lead Solutions Architect",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "Priya Patel",
        role: "Director of Operations",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
    },
];

export default function AboutTeam() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            gsap.fromTo(
                ".team-header",
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
                ".team-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: "power3.out",
                }
            );

            // Subtle image parallax inside cards
            gsap.utils.toArray<HTMLElement>(".team-member-img").forEach((img) => {
                gsap.fromTo(
                    img,
                    { y: "-5%" },
                    {
                        y: "5%",
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });

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
                    <span className="team-header font-mono text-xs text-metallic uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-signal rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        The People
                    </span>
                    <h2 className="team-header text-3xl md:text-5xl lg:text-6xl font-serif text-signal mt-4">
                        Meet the <span className="metallic-gradient-text italic font-bold">Team</span>
                    </h2>
                    <p className="team-header text-base md:text-lg text-metallic/60 font-sans mt-4 max-w-xl">
                        A small, senior team. No juniors, no outsourcing. Every person on your project writes production code.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM.map((member) => (
                        <div
                            key={member.name}
                            className="team-card group relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-metallic/10 hover:border-metallic/30 transition-all duration-500 transform-gpu cursor-default"
                        >
                            {/* Image */}
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="team-member-img object-cover scale-110 grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-[#030405]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                <span className="block font-mono text-[9px] text-metallic/50 uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {member.role}
                                </span>
                                <h3 className="text-lg md:text-xl font-serif text-signal">
                                    {member.name}
                                </h3>
                                <div className="w-8 h-px bg-gradient-to-r from-signal to-transparent mt-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
