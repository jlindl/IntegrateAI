import { Suspense } from "react";
import BookingContent from "./BookingContent";

export const metadata = {
    title: "Book Strategy Session — Integrate",
    description: "Secure your high-level AI automation strategy session with the Integrate engineering team.",
};

export default function BookingPage() {
    const calendarId = process.env.GHL_CALENDAR_ID || "";

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#030405] flex items-center justify-center font-mono text-xs text-white/20 tracking-widest uppercase animate-pulse">
                Establishing Bridge...
            </div>
        }>
            <BookingContent calendarId={calendarId} />
        </Suspense>
    );
}
