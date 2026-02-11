"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { PROFILE_TABS, profileConstants, ProfileTabs } from "@/constants/profileConstant"
import type { CurvedNavProps } from "@/interfaces/profileInterfaces"

export const CurvedNav = ({ activeTab, setActiveTab }: CurvedNavProps) => {
    //Refs to track button positions
    const buttonRefs = useRef<Record<ProfileTabs, HTMLButtonElement | null>>({
        [PROFILE_TABS.PROBLEM_SOLVING]: null,
        [PROFILE_TABS.DEVELOPMENT]: null
    });
    //State to track positions for the curved elements
    const [activePosition, setActivePosition] = useState<{ left: number, width: number }>({ left: 0, width: 0 })
    //State to track screen size,, default = lg
    const [screenWidth, setScreenWidth] = useState<number>(1024) 

    //Update screen width on client side only
    useEffect(() => {
        //Set initial width
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize(); 
        //Add resize listener
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //Update positions when active tab changes
    useEffect(() => {
        const activeButton = buttonRefs.current[activeTab]
        if(activeButton){
        const rect = activeButton.getBoundingClientRect()
        const parentRect = activeButton.parentElement?.getBoundingClientRect() || { left: 0 }
        setActivePosition({
            left: rect.left - parentRect.left + rect.width / 2,
            width: Math.min(rect.width, 180),
        })
    }
    }, [activeTab])

    //Calculate sizes based on screen width
    const getCurveWidth = () => {
        return activePosition.width + (screenWidth < 640 ? 12 : screenWidth < 1024 ? 15 : 18)
    }

    const getCurveHeight = () => {
        return screenWidth < 640 ? "24px" : screenWidth < 1024 ? "30px" : "36px"
    }

    const changeHandler = (tabKey: ProfileTabs) => () => {
        setActiveTab(tabKey)
    }

    return (
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 pb-2 sm:pb-3 lg:pb-4">
            <div className="relative h-8 sm:h-9 lg:h-10">
                <div className="absolute bottom-0 h-1 sm:h-1.5 lg:h-1.5 w-full bg-[#1A1B2E]">
                    <div className="absolute rounded-t-full bg-[#1A1B2E] transition-all duration-300"
                    style={{
                        bottom: "0",
                        left: activePosition.left,
                        width: getCurveWidth(),
                        height: getCurveHeight(),
                        transform: "translateX(-50%)",
                        opacity: activePosition.left === 0 ? 0 : 1,
                    }}/></div>
                    <div className="flex h-full items-end justify-center">
                    {profileConstants.map((item) => {
                        const tabKey = item.image as ProfileTabs;
                        return (
                            <button key={tabKey} onClick={changeHandler(tabKey)} className={`relative flex h-6 sm:h-7 lg:h-8 items-center px-3 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-sm font-medium transition-colors ${ activeTab === tabKey && activePosition.left > 0 ? "text-white" : "text-black"}`}ref={(el) => { 
                                buttonRefs.current[tabKey] = el 
                            }}>
                                <div className="relative flex items-center gap-1 sm:gap-1.5 lg:gap-1.5 pb-1 sm:pb-1.5 lg:pb-2">
                                    <Image src={`/common/${tabKey}.svg`} alt={item.label} width={16} height={16} className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                                    <span className="inline">{item.label}</span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}