"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface BookingCalendarProps {
    contactId: string;
    contactName: string;
}



export default function BookingCalendar({ contactId, contactName }: BookingCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null); // This will hold the ISO string
    const [friendlyTime, setFriendlyTime] = useState<string | null>(null);
    const [slots, setSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [step, setStep] = useState<"date" | "time" | "confirm" | "success">("date");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Calendar logic
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Padding for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`pad-${i}`} className="h-12 w-full" />);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(year, month, d);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isPast = date < today;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            days.push(
                <button
                    key={d}
                    disabled={isPast || isWeekend}
                    onClick={() => handleDateSelect(date)}
                    className={`h-12 w-full rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 relative group
                        ${isSelected ? 'bg-signal text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                        ${(isPast || isWeekend) ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {d}
                    {isSelected && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                    )}
                </button>
            );
        }
        return days;
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setIsLoadingSlots(true);
        setError(null);

        const fetchSlots = async () => {
            try {
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);
                
                const response = await fetch(`/api/availability?startDate=${startOfDay.getTime()}&endDate=${endOfDay.getTime()}`);
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.error || "Failed to fetch slots");
                
                const dateKey = date.toISOString().split('T')[0];
                const fetchedSlots = data[dateKey]?.slots || [];
                setSlots(fetchedSlots);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoadingSlots(false);
            }
        };

        // Change step immediately with transition
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setStep("time");
                gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.4 });
                fetchSlots();
            }
        });
    };

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    const handleTimeSelect = (isoTime: string) => {
        setSelectedTime(isoTime);
        setFriendlyTime(formatTime(isoTime));
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
                setStep("confirm");
                gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.4 });
            }
        });
    };

    const handleBack = () => {
        const prevStep = step === "confirm" ? "time" : "date";
        setError(null);
        gsap.to(contentRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => {
                setStep(prevStep);
                if (prevStep === "date") {
                    setSelectedTime(null);
                    setFriendlyTime(null);
                }
                gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.4 });
            }
        });
    };

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contactId,
                    meetingTime: selectedTime, // Send the ISO string
                    friendlyTime: friendlyTime
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to book meeting");
            }

            setStep("success");
            // GSAP success animation
            gsap.fromTo(".success-icon", 
                { scale: 0, rotate: -45 }, 
                { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" }
            );
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div ref={containerRef} className="w-full max-w-4xl bg-[#0a0c0e]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
                        {step === "success" ? "You're all set!" : "Let's find a time to talk."}
                    </h2>
                    <p className="text-white/40 font-sans text-sm mt-2">
                        {step === "success" ? "We've sent the details to your email." : `Select a time that works for you, ${contactName}.`}
                    </p>
                </div>
                {step !== "success" && (
                    <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/30 bg-white/5 border border-white/10 px-4 py-2 rounded-full h-fit">
                        <Clock size={12} className="text-signal" />
                        TIMES ARE IN BST/GMT
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row min-h-[450px]">
                {/* Left Sidebar - Summary */}
                {step !== "success" && (
                    <div className="w-full md:w-72 bg-white/[0.02] border-r border-white/5 p-8 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase">Selected Date</label>
                                <div className="flex items-center gap-3 text-white">
                                    <CalendarIcon size={18} className="text-signal/50" />
                                    <span className="text-sm font-medium">{selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Not selected"}</span>
                                </div>
                            </div>
                             <div className="space-y-4">
                                <label className="text-[10px] font-mono tracking-widest text-white/20 uppercase">Selected Time</label>
                                <div className="flex items-center gap-3 text-white">
                                    <Clock size={18} className="text-signal/50" />
                                    <span className="text-sm font-medium">{friendlyTime || "Not selected"}</span>
                                </div>
                            </div>
                        </div>

                        {step !== "date" && (
                            <button 
                                onClick={handleBack}
                                className="flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white transition-colors mt-8"
                            >
                                <ChevronLeft size={14} /> Back to {step === "time" ? "dates" : "times"}
                            </button>
                        )}
                    </div>
                )}

                {/* Main Calendar/Time/Confirm Area */}
                <div ref={contentRef} className="flex-1 p-8 md:p-12 flex flex-col">
                    
                    {step === "date" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-serif text-white">{monthName} {currentDate.getFullYear()}</h3>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                    >
                                        <ChevronLeft size={16} className="text-white" />
                                    </button>
                                    <button 
                                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                    >
                                        <ChevronRight size={16} className="text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <div key={`${d}-${i}`} className="text-center text-[10px] font-mono text-white/20 pb-4">{d}</div>
                                ))}
                                {renderDays()}
                            </div>
                        </div>
                    )}

                    {step === "time" && (
                        <div className="space-y-8 animate-in fade-in duration-500 flex-1 flex flex-col">
                            <h3 className="text-xl font-serif text-white">Available times</h3>
                            
                            {isLoadingSlots ? (
                                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
                                    <div className="w-12 h-12 border-2 border-signal/20 border-t-signal rounded-full animate-spin" />
                                    <p className="text-xs font-mono text-white/20 tracking-widest uppercase">Fetching availability...</p>
                                </div>
                            ) : slots.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {slots.map(isoTime => (
                                        <button
                                            key={isoTime}
                                            onClick={() => handleTimeSelect(isoTime)}
                                            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:border-signal/50"
                                        >
                                            {formatTime(isoTime)}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 text-center">
                                    <AlertCircle size={32} className="text-white/10" />
                                    <p className="text-sm text-white/40 max-w-[200px]">No sessions remaining for this day. Please try another date.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {step === "confirm" && (
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 rounded-full bg-signal/10 flex items-center justify-center border border-signal/20">
                                <Clock size={32} className="text-signal" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-serif text-white tracking-tight">Does this look right?</h3>
                                <p className="text-white/40 max-w-xs mx-auto text-sm leading-relaxed">
                                    You are booking a 30-minute Strategy Session for <br/>
                                    <span className="text-white font-medium">{selectedDate?.toDateString()}</span> at <span className="text-white font-medium">{friendlyTime}</span>.
                                </p>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                                    <AlertCircle size={14} /> {error}
                                </div>
                            )}

                            <button
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                                className="group relative w-full max-w-xs px-8 py-4 bg-signal text-black rounded-full font-sans text-sm font-bold overflow-hidden transition-all duration-400 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isSubmitting ? "Just a moment..." : "Confirm meeting"}
                                    {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> }
                                </span>
                            </button>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-8 py-12">
                            <div className="w-24 h-24 rounded-full bg-signal/10 border border-signal/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center success-icon">
                                <CheckCircle2 size={40} className="text-signal" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Successfully booked!</h3>
                                <p className="text-white/50 max-w-sm mx-auto text-lg">
                                    We&apos;ve added this to our calendar and we&apos;ll see you then!
                                </p>
                            </div>
                            <a 
                                href="/"
                                className="text-xs font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors pt-4"
                            >
                                Back to home
                            </a>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
