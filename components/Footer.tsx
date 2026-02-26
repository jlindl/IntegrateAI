import Link from "next/link";
import { Command } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#030405] text-signal rounded-t-[4rem] z-40 overflow-hidden pb-12 pt-24 px-6 md:px-12 mt-[-4rem]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 relative z-10">

                <div className="flex flex-col gap-6 max-w-sm">
                    <Link href="/" className="flex items-center gap-2 text-signal hover:text-metallic transition-colors">
                        <Command size={24} className="text-accent-glow" />
                        <span className="font-serif font-semibold text-2xl tracking-tight">Integrate</span>
                    </Link>
                    <p className="text-metallic font-sans tracking-wide leading-relaxed text-sm">
                        Premium AI Automation Agency. We design, build, and maintain bespoke AI architectures tailored to your exact operational logic.
                    </p>
                </div>

                <div className="flex flex-col gap-8 md:text-right w-full md:w-auto">
                    <div className="grid grid-cols-2 gap-8 md:gap-24">
                        <div className="flex flex-col gap-4 text-left md:text-right">
                            <span className="font-mono text-[10px] text-accent-glow uppercase tracking-widest mb-2 opacity-80">Agency</span>
                            <Link href="#engine" className="text-metallic hover:text-signal transition-colors text-sm">Services</Link>
                            <Link href="#process" className="text-metallic hover:text-signal transition-colors text-sm">Case Studies</Link>
                            <Link href="#process" className="text-metallic hover:text-signal transition-colors text-sm">Our Process</Link>
                        </div>
                        <div className="flex flex-col gap-4 text-left md:text-right">
                            <span className="font-mono text-[10px] text-accent-glow uppercase tracking-widest mb-2 opacity-80">Connect</span>
                            <Link href="#" className="text-metallic hover:text-signal transition-colors text-sm">Client Portal</Link>
                            <Link href="#" className="text-metallic hover:text-signal transition-colors text-sm">Careers</Link>
                            <Link href="#" className="text-metallic hover:text-signal transition-colors text-sm">Contact Us</Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-metallic/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 font-mono text-[10px] text-metallic/40">
                <p>© {new Date().getFullYear()} Integrate Operations LLC. All rights reserved.</p>

                <div className="flex items-center gap-3 bg-[#060708] border border-metallic/10 px-4 py-2 rounded-full shadow-inner">
                    <div className="relative flex items-center justify-center w-2 h-2">
                        <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-60"></div>
                        <div className="relative w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                    </div>
                    <span className="tracking-[0.2em] uppercase text-metallic/60">Accepting New Clients</span>
                </div>
            </div>
        </footer>
    );
}
