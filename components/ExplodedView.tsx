"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Database, Code2, LayoutTemplate } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ExplodedView() {
    const containerRef = useRef<HTMLElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const uiLayerRef = useRef<HTMLDivElement>(null);
    const logicLayerRef = useRef<HTMLDivElement>(null);
    const dataLayerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial 3D Setup
            gsap.set(stackRef.current, { perspective: 2500, transformStyle: "preserve-3d" });
            gsap.set([uiLayerRef.current, logicLayerRef.current, dataLayerRef.current], {
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=600%", // Extended scroll duration to allow for the exit sequence
                    pin: true,
                    scrub: 1, // Smooth visual scrubbing
                }
            });

            // 1. Tilt the stack into a dramatic isometric 3D view
            // Added Y-axis rotation and shifted origin for a cooler swoop effect
            tl.to([uiLayerRef.current, logicLayerRef.current, dataLayerRef.current], {
                rotationX: 55,
                rotationY: 0,
                rotationZ: -45,
                duration: 2,
                ease: "power2.inOut"
            }, 0);

            // 2. Explode the layers apart on the Z-axis with extreme depth
            // Top Layer shoots up high
            tl.to(uiLayerRef.current, {
                z: 600,
                opacity: 1,
                duration: 3,
                ease: "power3.inOut"
            }, 1);

            // Middle Layer stays relatively central but floats up slightly
            tl.to(logicLayerRef.current, {
                z: 150,
                opacity: 0.95,
                duration: 3,
                ease: "power3.inOut"
            }, 1);

            // Bottom Layer sinks deep into the background
            tl.to(dataLayerRef.current, {
                z: -400,
                opacity: 0.5,
                duration: 3,
                ease: "power3.inOut"
            }, 1);

            // Add a subtle continuous rotation to the whole stack as the user scrubs
            tl.to(stackRef.current, {
                rotationZ: 10,
                duration: 4,
                ease: "none"
            }, 0);

            // 3. Fade in the explanatory text on the left sequentially
            if (textRef.current) {
                tl.fromTo(textRef.current.children,
                    { opacity: 0, y: 50, filter: "blur(10px)" }, // More dramatic entrance
                    { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.4, duration: 2, ease: "power2.out" },
                    1.2 // Starts slightly earlier relative to explosion
                );
            }

            // 4. Highlight elements within the layers (Micro-animations trigger deep in the scroll)
            tl.to(".ui-glass", { boxShadow: "0 0 80px rgba(255,255,255,0.2)", duration: 1 }, 2.5);
            tl.to(".logic-node", { backgroundColor: "#fff", boxShadow: "0 0 30px #fff", scale: 1.5, duration: 0.5, stagger: 0.15 }, 2);
            tl.to(".data-stream", { opacity: 1, height: "100%", duration: 1.5, stagger: 0.2 }, 2);

            // 5. THE EXIT TRANSITION: Collapse and Wipe (Concept 1)
            // A. Collapse everything quickly back to center
            tl.to([uiLayerRef.current, logicLayerRef.current, dataLayerRef.current], {
                z: 0,
                opacity: 1,
                duration: 2,
                ease: "power4.inOut"
            }, 3.5); // Starts after previous animations settle

            // B. Level out the rotation back to flat 2D facing the camera
            tl.to([uiLayerRef.current, logicLayerRef.current, dataLayerRef.current], {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                duration: 2,
                ease: "power4.inOut"
            }, 3.5);

            // Cancel the continuous stack rotation
            tl.to(stackRef.current, {
                rotationZ: 0,
                duration: 2,
                ease: "power4.inOut"
            }, 3.5);

            // Fade out the left side text so the focus is entirely on the screen
            tl.to(textRef.current, {
                opacity: 0,
                x: -100,
                duration: 1.5,
                ease: "power2.in"
            }, 3.5);

            // C. Extreme scale up of the UI Layer to create a blackout wipe
            // Sinking the logic and data layers
            tl.to([logicLayerRef.current, dataLayerRef.current], {
                opacity: 0,
                scale: 0.5,
                duration: 1
            }, 5);

            // Plunging the UI layer directly into the camera
            tl.to(uiLayerRef.current, {
                scale: 15, // Massive scale to cover the screen
                opacity: 0, // Fade out as it passes through the camera
                duration: 3,
                ease: "power3.in"
            }, 5);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] bg-[#030405] overflow-hidden flex items-center">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10">

                {/* Left Side: Explanatory Text */}
                <div ref={textRef} className="w-full md:w-1/3 flex flex-col gap-6 -translate-y-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-white">Full-Stack<br /><span className="italic text-signal">Architecture.</span></h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-white/5 border border-white/10 rounded-md shrink-0">
                                <LayoutTemplate size={20} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-mono text-sm tracking-widest uppercase text-white mb-1">Surface</h4>
                                <p className="text-metallic/80 text-sm leading-relaxed">High-fidelity interfaces built with absolute precision. We engineer for low latency, silky animations, and peak conversion.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-white/5 border border-white/10 rounded-md shrink-0">
                                <Code2 size={20} className="text-metallic hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-mono text-sm tracking-widest uppercase text-metallic mb-1">Logic</h4>
                                <p className="text-metallic/80 text-sm leading-relaxed">State management, edge computing, and complex routing geometries that run invisibly and instantaneously.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 bg-white/5 border border-white/10 rounded-md shrink-0">
                                <Database size={20} className="text-metallic/60" />
                            </div>
                            <div>
                                <h4 className="font-mono text-sm tracking-widest uppercase text-metallic/60 mb-1">Infrastructure</h4>
                                <p className="text-metallic/60 text-sm leading-relaxed">The bedrock. Scalable databases, secure API layers, and heavy infrastructure designed to handle infinite scale.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: The 3D Stack */}
                <div ref={stackRef} className="w-full md:w-2/3 h-[600px] flex items-center justify-center translate-x-6 md:translate-x-16">
                    <div className="relative w-[600px] h-[420px] md:w-[700px] md:h-[480px]">

                        {/* Layer 3: Infrastructure (Bottom) */}
                        <div ref={dataLayerRef} className="absolute inset-0 bg-[#0a0c0e] border border-white/5 rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-center opacity-40">
                                <div className="text-xs font-mono text-white/50">&lt;Infrastructure /&gt;</div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            {/* Visual representation of servers/racks */}
                            <div className="flex gap-4 h-full mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex-1 border border-white/5 rounded-md relative overflow-hidden bg-black/50">
                                        <div className="absolute bottom-0 w-full h-0 bg-signal/20 data-stream"></div>
                                        <div className="w-full h-1 bg-white/10 mt-2 mb-4 mx-auto w-3/4"></div>
                                        <div className="w-full h-1 bg-white/10 mb-4 mx-auto w-3/4"></div>
                                        <div className="w-full h-1 bg-white/10 mx-auto w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Layer 2: Logic (Middle) */}
                        <div ref={logicLayerRef} className="absolute inset-0 bg-[#0a0c0e]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center">
                            <div className="absolute top-6 left-6 text-xs font-mono text-white/70">&lt;Logic /&gt;</div>

                            {/* Visual representation of logic nodes connecting */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Base wireframe */}
                                <div className="absolute w-[60%] h-[2px] bg-white/10"></div>
                                <div className="absolute h-[60%] w-[2px] bg-white/10"></div>

                                {/* Nodes */}
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-white/20 logic-node"></div>
                                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-white/20 logic-node"></div>
                                <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-white/20 logic-node"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-white/20 logic-node"></div>

                                {/* Central processor */}
                                <div className="w-16 h-16 border border-signal bg-signal/10 rounded-lg flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    <Code2 className="text-signal" />
                                </div>
                            </div>
                        </div>

                        {/* Layer 1: UI Surface (Top) */}
                        <div ref={uiLayerRef} className="absolute inset-0 bg-[#030405] border border-white/20 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden ui-glass transition-colors transform-gpu flex flex-col">
                            {/* Fake Browser header */}
                            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md relative z-20">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <div className="mx-auto px-6 py-1 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-metallic/80 flex items-center justify-center min-w-[150px]">
                                    integrate.ai
                                </div>
                            </div>
                            {/* Real Website Mockup using Image */}
                            <div className="relative flex-1 w-full bg-[#0a0c0e]">
                                <Image
                                    src="/dashboard-cool.png"
                                    alt="High-end dashboard UI"
                                    fill
                                    className="object-cover object-top opacity-90 mix-blend-screen"
                                />
                                {/* Ambient glow over the UI */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-signal/10 to-transparent mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
