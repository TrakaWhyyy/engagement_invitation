'use client'

import { useRef } from "react"
import Image from "next/image"
import background from "@/assets/follower.png"
import couple from "@/assets/couple.jpeg"
import couplePhotoFrame from "@/assets/couplephotframe.png"
import floralPattern from "@/assets/v782-adj-46.jpg"
import floralCorner from "@/assets/floral-corner.png" // <-- add the uploaded flower PNG here
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

            {/* Section 1: Invitation Card*/}
            <div className="relative z-10 flex min-h-screen items-center justify-center bg-[#FBFBFB] overflow-hidden">
                <div className="absolute inset-0 z-0 h-full w-full">
                    <Image
                        src={background}
                        alt="Background"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>

                {/* Floral corner decorations */}
                {/* Top-left: original orientation */}
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-5 w-32 h-32 md:w-56 md:h-56 z-10 pointer-events-none rotate-90">
                    <Image
                        src={floralCorner}
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Top-right: mirrored horizontally */}
                <div className="absolute -top-6 -right-6 md:-top-5 md:-right-10 w-32 h-32 md:w-56 md:h-56 z-10 pointer-events-none rotate-180">
                    <Image
                        src={floralCorner}
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>



                <div className="flex flex-col z-20 items-center gap-3">
                    <h2 className={`title ${mainFonts.className} text-lg md:text-4xl font-bold text-[#FAE251] text-shadow-lg`}>ENGAGEMENT INVITATION</h2>

                    <div className="relative md:w-120 md:h-120 w-70 h-70 mx-auto">
                        <div className="absolute inset-6 m-5 md:m-15 z-10">
                            <Image
                                src={couple}
                                alt="Couple photo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Image
                            src={couplePhotoFrame}
                            alt="Photo frame"
                            fill
                            className="object-top-left z-20"
                        />
                    </div>

                    <h2 className='font-light text-black text-4xl'>You are Invited for</h2>
                    <h3 className={`name ${maellenFonts.className} text-5xl font-semibold text-black`}> Himaya Medini & Deepane Lanarolle</h3>
                    <button
                        onClick={scrollToDetails}
                        className="
                    px-8 py-3 bg-emerald-900 text-amber-200 w-1/3 font-semibold text-xs tracking-widest uppercase rounded-3xl border border-amber-400/40 hover:bg-emerald-800 hover:text-amber-100 hover:border-amber-300 shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                        <p>More Detail</p>
                    </button>
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