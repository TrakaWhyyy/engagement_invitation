import React, { useState, useEffect } from 'react';
import { isBefore, parseISO } from 'date-fns';
import localFont from "next/font/local";

// Define the schedule data type
interface EventItem {
    id: number;
    time: string;       // Display time string (e.g., "05:30 PM")
    dateTime: Date;     // Exact target date/time for logic checks
    title: string;
    description: string;
}

// 1. DATA CONFIGURATION
// Update these strings to match your real engagement date and sequence times
const engagementEvents: EventItem[] = [
    {
        id: 1,
        time: "05:30 PM",
        dateTime: parseISO('2026-10-15T17:30:00'),
        title: "Guest Arrival & Welcome Drinks",
        description: "Welcome family and friends with signature mocktails and soft background music.",
    },
    {
        id: 2,
        time: "06:15 PM",
        dateTime: parseISO('2026-10-15T18:15:00'),
        title: "The Engagement Ceremony",
        description: "Main event: exchange of rings, family blessings, and promises.",
    },
    {
        id: 3,
        time: "07:00 PM",
        dateTime: parseISO('2026-10-15T19:00:00'),
        title: "Photography & Portraits",
        description: "Capturing memories with the stage backdrop, family, and close friends.",
    },
    {
        id: 4,
        time: "08:00 PM",
        dateTime: parseISO('2026-10-15T20:00:00'),
        title: "Grand Dinner & Celebrations",
        description: "Opening the buffet, cake cutting, and celebratory music.",
    },
];

const beautifulFonts = localFont({
    src: "../assets/BeautifulReluxes-2v2Dw.otf"
})

export const EngagementTimeline: React.FC = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        // Keep internal clock updated to check event states (passed vs upcoming)
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="max-w-xl mx-auto p-6 my-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h2 className={`${beautifulFonts.className} text-xl sm:text-2xl font-serif font-semibold text-slate-800 mb-8 text-center tracking-wide`}>
                Event Schedule
            </h2>

            {/* The Vertical Timeline Track */}
            <div className="relative border-l-2 border-yellow-300 ml-3 md:ml-6 pl-6 space-y-8">
                {engagementEvents.map((event) => {
                    // Dynamic status check: True if event time is earlier than right now
                    const isPassed = isBefore(event.dateTime, now);

                    return (
                        <div key={event.id} className="relative group">
                            {/* Timeline Indicator Node */}
                            <div
                                className={`absolute -left-8 top-1.5 size-5 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                                    isPassed
                                        ? 'bg-yellow-500 border-yellow-100 scale-110 shadow-sm' // Active/Passed state
                                        : 'bg-white border-yellow-100 group-hover:border-yellow-300' // Future state
                                }`}
                            />

                            {/* Event Block Card */}
                            <div className={`p-4 rounded-xl border transition-all ${
                                isPassed
                                    ? 'bg-yellow-50/40 border-yellow-100/60' // Passed state visual style
                                    : 'bg-white border-slate-100 group-hover:shadow-md' // Upcoming state visual style
                            }`}>
                                <time className={`text-sm font-semibold tracking-wide ${isPassed ? 'text-yellow-600' : 'text-slate-400'}`}>
                                    {event.time}
                                </time>
                                <h3 className={`mt-0.5 text-lg font-semibold ${isPassed ? 'text-yellow-900/80' : 'text-slate-800'}`}>
                                    {event.title}
                                </h3>
                                <p className={`mt-1 text-sm leading-relaxed ${isPassed ? 'text-yellow-800/60' : 'text-slate-600'}`}>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};