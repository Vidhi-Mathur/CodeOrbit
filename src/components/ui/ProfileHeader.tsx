import type { ProfileHeaderProps } from "@/interfaces/profileInterfaces"
import { About } from "@/components/ui/About"
import { CurvedNav } from "@/components/ui/CuvedNav"

export const ProfileHeader = ({ user, activeTab, onTabChange }: ProfileHeaderProps) => {
    return (
        <div className="p-3 sm:p-4 lg:p-6 bg-white h-auto sm:h-auto lg:h-[calc(5/12*100vh)] pt-[72px] sm:pt-[70px] lg:pt-[80px] relative">
            <About name={user.name} username={user.username} image={user.image} email={user.email} education={user.education} info={user.platforms.others} />
            <div className="absolute -bottom-3 sm:-bottom-3 lg:-bottom-4 left-0 right-0 z-10">
                <CurvedNav activeTab={activeTab} setActiveTab={onTabChange} />
            </div>
        </div>
    )
}
