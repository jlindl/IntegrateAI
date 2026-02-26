"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background parallax
            gsap.to(".parallax-bg", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: 150,
                ease: "none",
            });

            // Statement reveal
            gsap.from(".statement-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "top 30%",
                    scrub: true,
                },
                y: 100,
                opacity: 0,
                stagger: 0.3,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophy"
            ref={sectionRef}
            className="relative w-full py-40 bg-[#08080c] overflow-hidden flex items-center justify-center min-h-[80vh]"
        >
            {/* Low-opacity parallax texture */}
            <div
                className="parallax-bg absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.1) 0%, transparent 60%)",
                    backgroundSize: "100px 100px",
                }}
            />
            <div className="absolute inset-0 bg-[#08080c]/80 z-0 backdrop-blur-[2px]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <p className="statement-text text-3xl md:text-5xl lg:text-7xl font-serif text-slate-400 mb-8 leading-tight">
                    We build systems that work for you.
                </p>
                <p className="statement-text text-3xl md:text-5xl lg:text-7xl font-serif text-ivory italic leading-tight">
                    You don&apos;t work for the systems.
                </p>

                <div className="mt-20 statement-text">
                    <div className="w-px h-24 bg-gradient-to-b from-champagne/50 to-transparent mx-auto" />
                </div>
            </div>
        </section>
    );
}
