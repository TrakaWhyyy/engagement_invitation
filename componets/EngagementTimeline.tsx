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
        time: "9:00 AM",
        dateTime: parseISO('2026-07-30T09:00:00'),
        title: "Ceremony Commences",
        description: "The celebration begins as families and loved ones gather to witness this beautiful new chapter.",
    },
    {
        id: 2,
        time: "09:05 AM",
        dateTime: parseISO('2026-07-30T09:05:00'),
        title: "Registration & Ring Exchange",
        description: "The couple formally exchanges rings, symbolizing their promise and commitment to one another.",
    },
    {
        id: 3,
        time: "09:30 AM",
        dateTime: parseISO('2026-07-30T09:30:00'),
        title: "Traditional Tea Ceremony",
        description: "A time-honored ritual where the couple honors their elders and family traditions over tea.",
    },
    {
        id: 4,
        time: "10:15 AM",
        dateTime: parseISO('2026-07-30T10:15:00'),
        title: "Cake Cutting",
        description: "A sweet moment shared together, marking the joy of their engagement.",
    },
    {
        id: 5,
        time: "12:00 PM",
        dateTime: parseISO('2026-07-30T12:00:00'),
        title: "Grand Lunch & Celebration",
        description: "Guests are invited to feast, celebrate, and share in the couple's happiness.",
    },
    {
        id: 6,
        time: "02:45 PM",
        dateTime: parseISO('2026-07-30T14:45:00'),
        title: "Farewell & Send-Off",
        description: "A warm farewell as the festivities draw to a close, sending the couple off with blessings and joy.",
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
        <div className="w-4/5 md:max-w-xl mx-auto p-4 sm:p-6 my-4 sm:my-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h2 className={`${beautifulFonts.className} text-lg sm:text-2xl font-serif font-semibold text-slate-800 mb-6 sm:mb-8 text-center tracking-wide`}>
                Event Schedule
            </h2>

            {/* The Vertical Timeline Track */}
            <div className="relative border-l-2 border-yellow-300 ml-2 sm:ml-3 md:ml-6 pl-4 sm:pl-6 space-y-6 sm:space-y-8">
                {engagementEvents.map((event) => {
                    // Dynamic status check: True if event time is earlier than right now
                    const isPassed = isBefore(event.dateTime, now);

                    return (
                        <div key={event.id} className="relative group">
                            {/* Timeline Indicator Node */}
                            <div
                                className={`absolute -left-6 sm:-left-8 top-2 sm:top-1.5 size-4 sm:size-5 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                                    isPassed
                                        ? 'bg-yellow-500 border-yellow-100 scale-110 shadow-sm' // Active/Passed state
                                        : 'bg-white border-yellow-100 group-hover:border-yellow-300' // Future state
                                }`}
                            />

                            {/* Event Block Card */}
                            <div className={`p-3 sm:p-4 rounded-xl border transition-all ${
                                isPassed
                                    ? 'bg-yellow-50/40 border-yellow-100/60' // Passed state visual style
                                    : 'bg-white border-slate-100 group-hover:shadow-md' // Upcoming state visual style
                            }`}>
                                <time className={`text-xs sm:text-sm font-semibold tracking-wide ${isPassed ? 'text-yellow-600' : 'text-slate-400'}`}>
                                    {event.time}
                                </time>
                                <h3 className={`mt-0.5 text-base sm:text-lg font-semibold ${isPassed ? 'text-yellow-900/80' : 'text-slate-800'}`}>
                                    {event.title}
                                </h3>
                                <p className={`mt-1 text-xs sm:text-sm leading-relaxed ${isPassed ? 'text-yellow-800/60' : 'text-slate-600'}`}>
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
