"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface LinkButtonProps {
    href: string;
    icon: ReactNode;
    label: string;
    isExternal?: boolean;
    variant?: "dark" | "light";
}

export default function LinkButton({ href, icon, label, isExternal = false, variant = "dark" }: LinkButtonProps) {
    const Component = isExternal ? "a" : Link;
    const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

    const isLight = variant === "light";

    return (
        <Component
            href={href}
            {...extraProps}
            className={`group relative w-full max-w-md px-8 py-5 rounded-sm flex items-center justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02] transform-gpu animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both ${
                isLight 
                ? "bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-black/10" 
                : "glass-panel border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-white/30"
            }`}
        >
            {/* Mirror/Metallic Shine Effect */}
            <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${isLight ? "via-black/5" : "via-white/5"} to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out`} />
            
            <div className="flex items-center gap-5 relative z-10">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] ${
                    isLight 
                    ? "bg-black/5 border border-black/5 text-black group-hover:bg-black group-hover:text-white" 
                    : "bg-white/5 border border-white/10 text-signal group-hover:bg-white group-hover:text-[#030405]"
                }`}>
                    {icon}
                </div>
                <span className={`font-sans font-bold text-lg tracking-wide uppercase transition-colors skew-x-[-5deg] ${
                    isLight ? "text-black group-hover:text-black/80" : "text-white group-hover:text-signal"
                }`}>
                    {label}
                </span>
            </div>

            <div className={`relative z-10 transition-all duration-300 group-hover:translate-x-1 ${
                isLight ? "text-black/30 group-hover:text-black" : "text-metallic group-hover:text-white"
            }`}>
                <ArrowRight size={20} />
            </div>
            
            {/* Bottom Glow */}
            <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isLight ? "via-black/10" : "via-white/20"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        </Component>
    );
}
