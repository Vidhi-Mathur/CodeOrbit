import type { ProfileHeaderProps } from "@/interfaces/profileInterfaces"
import { About } from "@/components/ui/About"
import { CurvedNav } from "@/components/ui/CuvedNav"

export const ProfileHeader = ({ user, activeTab, onTabChange, onRefresh, refreshState }: ProfileHeaderProps) => {
    return (
        <div className="relative p-3 sm:p-4 lg:p-6 bg-white lg:h-[calc(5/12*100vh)] pt-[72px] sm:pt-[70px] lg:pt-[80px] pb-16 sm:pb-16 lg:pb-0">  
            <div className="flex flex-col lg:block">
                <About name={user.name} username={user.username} image={user.image} email={user.email} education={user.education} info={user.platforms.others} />
                <div className="flex flex-row items-center gap-3 absolute bottom-8 left-1/2 -translate-x-1/2 lg:bottom-4 lg:left-4 lg:translate-x-0">
                    <button onClick={onRefresh} disabled={refreshState.status === "loading"} className={`px-6 py-2 text-sm font-medium tracking-wide rounded-xl bg-gradient-to-r from-[#1A1B2E] to-[#23244a] text-white shadow-md transition-all duration-200 ${refreshState.status === "loading"? "opacity-70 cursor-not-allowed": "hover:-translate-y-0.5 hover:shadow-lg"}`}>
                        {refreshState.status === "loading" ? "Refreshing..." : "Refresh"}
                    </button>
                    {refreshState.status !== "idle" && refreshState.status !== "loading" && (
                        <span className={`text-xs px-3 py-1 rounded-full ${refreshState.status === "success"? "bg-green-100 text-green-700": "bg-red-100 text-red-700"}`}>
                            {refreshState.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="absolute -bottom-3 lg:-bottom-5 left-0 right-0 z-10">
                <CurvedNav activeTab={activeTab} setActiveTab={onTabChange} />
            </div>
        </div>
    )
}