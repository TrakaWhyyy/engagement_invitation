'use client'

import { useRef } from "react"
import Image from "next/image"
import couple from "@/assets/couple.jpeg"
import floralPattern from "@/assets/v782-adj-46.jpg"
import localFont from "next/font/local"
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react'
import {SplitText} from "gsap/SplitText"
import {EngagementCountdown} from "@/componets/EngagementCountdown";
import {EngagementTimeline} from "@/componets/EngagementTimeline";
import {InvitationGenerator} from "@/componets/InvitationGenerator";

gsap.registerPlugin(useGSAP, SplitText)
const mainFonts = localFont({
    src: "../assets/PlaywriteHU-Regular.ttf"
})
const maellenFonts = localFont({
    src: "../assets/Maellen-e9j06.otf"
})

export default function Home() {
    const detailsRef = useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        const titleSplit = new SplitText('.title',{type: 'chars, words'})
        gsap.from(titleSplit.words, {
            yPercent: 80,
            duration: 1.8,
            ease: 'power2.out',
            stagger: 0.2,
        })
        const nameSplit = new SplitText('.name',{type: 'chars, words'})
        gsap.from(nameSplit.words, {
            yPercent: 80,
            duration: 1.8,
            ease: 'power2.out',
            stagger: 0.2,
        })
    },[]);

    const scrollToDetails = () => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="relative flex flex-col flex-1 font-sans h-screen overflow-y-auto">

            {/* Section 1: Invitation Card */}
            <div className="relative z-10 flex min-h-screen items-center justify-center py-2 px-4 overflow-hidden">
                <div className="relative w-full h-full max-w-125 mx-auto">

                    {/* Outer frame */}
                    <div className="relative border border-[#8a7f76] p-2">
                        <div className="relative border border-[#8a7f76] p-4">

                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                {/* The actual image */}
                                <Image
                                    src={couple}
                                    alt="Himaya & Deepane"
                                    fill
                                    priority
                                    className="object-cover object-top"
                                />

                                {/* The overlay gradient that fades to the background color */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#EDE8E2]/20 via-transparent to-transparent points-80"
                                     style={{
                                         background: 'linear-gradient(to top, #EDE8E2 0%, rgba(237, 232, 226, 0) 45%)'
                                     }}
                                />
                            </div>

                            {/* Names block, overlapping the fade */}
                            <div className="relative -mt-24 flex flex-col items-center text-center px-4 pb-2">

                                {/* Rings icon */}
                                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mb-2 text-[#8a7f76]">
                                    <path d="M28 4 L28 14 M22 8 L25 12 M34 8 L31 12 M20 10 L22 14 M36 10 L34 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                    <circle cx="22" cy="30" r="11" stroke="currentColor" strokeWidth="1"/>
                                    <circle cx="34" cy="30" r="11" stroke="currentColor" strokeWidth="1"/>
                                </svg>

                                <h2 className={`text-3xl md:text-4xl tracking-[0.15em] text-[#5b5049] ${mainFonts.className}`}>
                                    HIMAYA
                                </h2>
                                <span className={`text-xl text-[#8a7f76] -my-1 ${maellenFonts.className}`}>and</span>
                                <h2 className={`text-3xl md:text-4xl tracking-[0.15em] text-[#5b5049] ${mainFonts.className}`}>
                                    DEEPANE
                                </h2>

                                <p className="mt-4 text-sm md:text-base tracking-[0.3em] text-[#8a7f76]">
                                    WEDDING INVITATION
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* CTA button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={scrollToDetails}
                            className="px-10 py-3 bg-transparent text-[#5b5049] font-medium text-xs tracking-[0.25em] uppercase border border-[#8a7f76] rounded-full hover:bg-[#5b5049] hover:text-[#EDE8E2] transition-all duration-300"
                        >
                            More Detail
                        </button>
                    </div>

                </div>
            </div>
            {/* Section 2: Contain */}
            <div
                ref={detailsRef}
                className="relative flex flex-col min-h-screen items-center justify-center overflow-hidden bg-[#FBFBFB]">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src={floralPattern}
                        alt=""
                        fill
                        className="object-contain md:object-cover object-center opacity-40"
                    />
                </div>

                <div className="relative z-10 flex flex-col w-full items-center justify-center">
                    <EngagementCountdown />
                    <EngagementTimeline />
                    <InvitationGenerator />
                </div>
            </div>
        </div>
    )
}
