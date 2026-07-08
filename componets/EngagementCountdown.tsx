import React, { useState, useEffect } from 'react';
// 1. Import precise, tree-shakable date helper functions
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import localFont from "next/font/local";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isCelebration: boolean;
}

const beautifulFonts = localFont({
    src: "../assets/BeautifulReluxes-2v2Dw.otf"
})

export const EngagementCountdown: React.FC = () => {
    const TARGET_DATE = new Date('2026-07-30T18:00:00');

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date();

        // If current time has passed the target date, trigger celebration
        if (now >= TARGET_DATE) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isCelebration: true };
        }

        // 2. The library abstracts all the millisecond math for us completely
        const totalDays = differenceInDays(TARGET_DATE, now);
        const totalHours = differenceInHours(TARGET_DATE, now) % 24;
        const totalMinutes = differenceInMinutes(TARGET_DATE, now) % 60;
        const totalSeconds = differenceInSeconds(TARGET_DATE, now) % 60;

        return {
            days: totalDays,
            hours: totalHours,
            minutes: totalMinutes,
            seconds: totalSeconds,
            isCelebration: false
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    if (timeLeft.isCelebration) {
        return (
            <div className="flex flex-col items-center justify-center bg-[#FBEF76]/30 p-10 rounded-2xl shadow-xl max-w-lg mx-auto my-10 text-center border border-[#FFD400] animate-bounce">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">The Big Day is Here! 💍</h1>
                <p className="text-xl font-medium text-rose-600">Happy Engagement Day! ✨</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#FBEF76]/30 p-8 sm:p-10 rounded-2xl shadow-lg max-w-xl mx-auto my-10 text-center border border-[#FFD400] backdrop-blur-sm">
            <h1 className={`${beautifulFonts.className} text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mb-8 tracking-wide`}>
                Counting Down to Our Engagement
            </h1>

            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
                {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Mins', value: timeLeft.minutes },
                    { label: 'Secs', value: timeLeft.seconds, pulse: true }
                ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl border border-rose-100/80 shadow-sm transition-transform hover:scale-105">
            <span className={`text-2xl sm:text-4xl font-mono font-bold text-rose-600 tabular-nums ${item.pulse ? 'animate-pulse' : ''}`}>
              {formatNumber(item.value)}
            </span>
                        <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">
              {item.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};