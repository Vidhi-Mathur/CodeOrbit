'use client'; 
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { profileConstants } from "@/constants/profileConstant";
import type { CurvedNavProps } from "@/interfaces/profileInterfaces";

export const CurvedNav = ({ activeTab, setActiveTab }: CurvedNavProps) => {
    //Refs to track button positions
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
    //State to track positions for the curved elements
    const [activePosition, setActivePosition] = useState({ left: 0, width: 0 })
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
  
    return (
        <div className="flex flex-col gap-16 pb-4">
            <div className="relative h-10">
                <div className="absolute bottom-0 h-1.5 w-full bg-[#1A1B2E]">
                {/* Curved protrusion for active tab */}
                    <div className="absolute h-6 w-12 rounded-t-full bg-[#1A1B2E] transition-all duration-300" style={{
                        bottom: "0",
                        left: activePosition.left,
                        width: activePosition.width + 18,
                        height: "36px",
                        transform: "translateX(-50%)",
                        opacity: activePosition.left === 0 ? 0 : 1
                    }}/>
                </div>
                <div className="flex h-full items-end justify-center">
                    {profileConstants.map((item) => (
                        <button key={item.image} ref={(el) => { buttonRefs.current[item.image] = el; }} onClick={() => setActiveTab(item.image)} className={`relative flex h-8 items-center px-6 text-sm font-medium transition-colors ${activeTab === item.image && activePosition.left > 0 ? 'text-white' : 'text-black'}`}>
                            <div className="relative flex items-center gap-1.5 pb-2">
                                <Image src={`/common/${item.image}.svg`} alt={item.label} width={24} height={24} className="h-4 w-4" />
                                {item.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
  }