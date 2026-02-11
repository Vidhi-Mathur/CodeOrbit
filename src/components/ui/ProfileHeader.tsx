import type { ProfileHeaderProps } from "@/interfaces/profileInterfaces"
import { About } from "@/components/ui/About"
import { CurvedNav } from "@/components/ui/CuvedNav"

export const ProfileHeader = ({ user, activeTab, onTabChange, onRefresh }: ProfileHeaderProps) => {
    return (
        <div className="relative p-3 sm:p-4 lg:p-6 bg-white lg:h-[calc(5/12*100vh)] pt-[72px] sm:pt-[70px] lg:pt-[80px] pb-16 sm:pb-16 lg:pb-0">  
            <div className="flex flex-col lg:block">
                <About name={user.name} username={user.username} image={user.image} email={user.email} education={user.education} info={user.platforms.others} />
                <button onClick={onRefresh} className=" z-20 px-6 py-2 text-sm font-medium tracking-wide rounded-xl bg-gradient-to-r from-[#1A1B2E] to-[#23244a] text-white shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 ease-out cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-6 lg:bottom-4 lg:left-4 lg:translate-x-0 lg:right-auto">
                    Refresh
                </button>
            </div>
            <div className="absolute -bottom-3 lg:-bottom-5 left-0 right-0 z-10">
                <CurvedNav activeTab={activeTab} setActiveTab={onTabChange} />
            </div>
        </div>
    )
}