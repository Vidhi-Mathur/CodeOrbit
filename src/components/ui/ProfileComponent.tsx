"use client"
import axios from "axios"
import { useState } from "react"
import type { ProfileComponentProps } from "@/interfaces/profileInterfaces"
import { DsaLink, DevLink, PROFILE_TABS, ProfileTabs, DSA_LINKS, DEV_LINKS } from "@/constants/profileConstant"
import { ProfileHeader } from "./ProfileHeader"
import { DSASection } from "../dsa/DSASection"
import { DevSection } from "../dev/DevSection"
import { useQueryClient } from "@tanstack/react-query"

const ProfileComponent = ({ user }: ProfileComponentProps) => {
    const queryClient = useQueryClient()
    const [activeTab, setActiveTab] = useState<ProfileTabs>(PROFILE_TABS.PROBLEM_SOLVING)
    const [activePlatform, setActivePlatform] = useState<DsaLink | DevLink>(DSA_LINKS.LEETCODE)

    const getUsername = (platform: DsaLink | DevLink): string | undefined => {
        if(Object.values(DSA_LINKS).includes(platform as DsaLink)) return user.platforms.dsa?.[platform as keyof typeof user.platforms.dsa]
        else if(Object.values(DEV_LINKS).includes(platform as DevLink)) return user.platforms.dev?.[platform as keyof typeof user.platforms.dev]
        return undefined
    }

    const tabChangeHandler = (tab: ProfileTabs) => {
        setActiveTab(tab)
        if(tab === PROFILE_TABS.PROBLEM_SOLVING){
            //If current platform is not a CP platform, set default to leetcode
            if(!Object.values(DSA_LINKS).includes(activePlatform as DsaLink)){
                setActivePlatform(DSA_LINKS.LEETCODE)
            }
        } 
        else if(tab === PROFILE_TABS.DEVELOPMENT){
            //If current platform is not a Dev platform, set default to github
            if(!Object.values(DEV_LINKS).includes(activePlatform as DevLink)){
                setActivePlatform(DEV_LINKS.GITHUB)
            }
        }
    }

    const platformChangeHandler = (platform: DsaLink | DevLink) => {
        if(platform === activePlatform) return
        setActivePlatform(platform)
    }

    const refreshHandler = async() => {
        const username = getUsername(activePlatform)
        await axios.post(`/api/refresh`, { 
            platform: activePlatform,
            username: username
        })
        queryClient.invalidateQueries({
            queryKey: [activePlatform, username]
        })
    }

    return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col w-full lg:w-3/4">
            <ProfileHeader user={user} activeTab={activeTab} onTabChange={tabChangeHandler} onRefresh={refreshHandler} />
            <div className="bg-blue-200 flex-1 lg:h-[calc(3/4*100vh)] overflow-y-auto scrollbar-hide">
                {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
                    <DSASection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} />
                )}
                {activeTab === PROFILE_TABS.DEVELOPMENT && (
                    <DevSection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} />
                )}
                <div className="block lg:hidden bg-cyan-200 mt-4">
                    <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                        {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
                            <DSASection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} renderSidebarOnly={true} />
                        )}
                        {activeTab === PROFILE_TABS.DEVELOPMENT && (
                            <DevSection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} renderSidebarOnly={true} />
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden lg:block lg:w-1/4 bg-cyan-200 pt-[80px] overflow-y-auto h-screen scrollbar-hide">
            {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
                <DSASection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} renderSidebarOnly={true} />
            )}
            {activeTab === PROFILE_TABS.DEVELOPMENT && (
                <DevSection user={user} activePlatform={activePlatform} onPlatformChange={platformChangeHandler} renderSidebarOnly={true} />
            )}
        </div>
    </div>
  )
}

export default ProfileComponent