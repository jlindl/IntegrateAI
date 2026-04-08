"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SERVICES = [
    "Outreach",
    "Calendar Booking",
    "CRM Integration",
    "Data Enrichment",
    "Analytics",
    "Lead Qualification",
    "Follow-up Sequences"
];

export default function ServicesCarousel() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!contentRef.current) return;

            const totalWidth = contentRef.current.scrollWidth / 2;

            // Infinite marquee animation
            gsap.to(contentRef.current, {
                x: -totalWidth,
                duration: 40,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Ensures seamless looping
                }
            });

            // Subtle fade-in on mount
            gsap.fromTo(marqueeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
            );

        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    // Duplicate services array to ensure enough content for seamless looping
    const displayServices = [...SERVICES, ...SERVICES, ...SERVICES];

    return (
        <section ref={marqueeRef} className="relative w-full py-16 bg-deep-carbon overflow-hidden border-y border-metallic/5 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-deep-carbon via-transparent to-deep-carbon z-10 pointer-events-none w-full h-full" />

            <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-center">
                <span className="font-mono text-[10px] text-metallic/60 uppercase tracking-[0.3em]">
                    Services We Automate
                </span>
            </div>

            <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-image-linear py-6">
                <div
                    ref={contentRef}
                    className="flex w-fit items-center flex-nowrap"
                >
                    {displayServices.map((service, index) => (
                        <div
                            key={`${service}-${index}`}
                            className="flex items-center px-8 md:px-12"
                        >
                            <span className="text-3xl md:text-5xl font-sans font-medium text-metallic/40 hover:text-signal transition-colors duration-500 cursor-default leading-normal pb-2">
                                {service}
                            </span>
                            {/* Optional separator dot if desired between items, removed to strictly match image inspiration which relies on spacing */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
