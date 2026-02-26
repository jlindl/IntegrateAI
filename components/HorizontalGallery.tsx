"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: 1,
        title: "Project Alpha",
        category: "Enterprise Dashboard",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Quantum Flow",
        category: "E-Commerce Architecture",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Nexus Core",
        category: "Fintech Platform",
        img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Aegis Security",
        category: "Landing Page Interface",
        img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function HorizontalGallery() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".gallery-item") as HTMLElement[];

            // 1. Initial fade-in coming out of the "Collapse & Wipe" blackout from ExplodedView
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "top top",
                        scrub: true
                    }
                }
            );

            // 2. The Horizontal Scroll Pin
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1), // Move all cards to the left
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    // The end defines how long the scroll takes. Making it wide based on sections length.
                    end: () => `+=${scrollWrapperRef.current?.offsetWidth || 3000}`,
                }
            });

            // 3. Parallax effect inside the images while scrolling horizontally
            sections.forEach((section) => {
                const img = section.querySelector(".gallery-img-inner");
                if (!img) return;

                gsap.fromTo(img,
                    { x: "10%" }, // Image starts shifted right inside its container
                    {
                        x: "-10%", // Image shifts left as user scrolls through the item
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current, // Use the main container as the base trigger
                            start: () => section.getBoundingClientRect().left - window.innerWidth,
                            end: () => section.getBoundingClientRect().right,
                            scrub: true,
                        }
                    }
                );
            });

            // 4. Subtle intro animation for the section header
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#030405] overflow-hidden flex flex-col justify-center">

            {/* Header Text */}
            <div ref={textRef} className="absolute top-[15vh] left-[5vw] z-20">
                <p className="font-mono text-xs text-signal tracking-[0.2em] uppercase mb-2">Portfolio</p>
                <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tighter">Case Studies</h2>
            </div>

            {/* Horizontal Scroll Wrapper */}
            <div ref={scrollWrapperRef} className="absolute top-1/2 -translate-y-1/2 left-0 flex h-[60vh] pl-[5vw]">
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="gallery-item relative w-[80vw] md:w-[60vw] h-full flex-shrink-0 mr-[10vw] flex flex-col justify-end overflow-visible group"
                    >
                        {/* Device Frame / Glass Container */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:shadow-[0_40px_100px_rgba(255,255,255,0.05)] bg-[#0a0c0e]">

                            {/* Inner image container for parallax */}
                            <div className="absolute inset-0 w-[120%] h-full -left-[10%] gallery-img-inner">
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent opacity-80" />
                            </div>

                        </div>

                        {/* Project Info Overlay */}
                        <div className="relative z-10 p-8 md:p-12 transform transition-transform duration-500 group-hover:-translate-y-4">
                            <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase mb-3 block">
                                {project.id < 10 ? `0${project.id}` : project.id} &mdash; {project.category}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight drop-shadow-lg">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
