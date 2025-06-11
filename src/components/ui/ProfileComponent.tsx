"use client"
import { useState } from "react"
import type { ProfileComponentProps } from "@/interfaces/profileInterfaces"
import { DsaLink, DevLink, PROFILE_TABS, ProfileTabs, dsaLinks, devLinks } from "@/constants/profileConstant"
import { ProfileHeader } from "./ProfileHeader"
import { DSASection } from "../dsa/DSASection"
import { DevSection } from "../dev/DevSection"

const ProfileComponent = ({ user }: ProfileComponentProps) => {
    const [activeTab, setActiveTab] = useState<ProfileTabs>(PROFILE_TABS.PROBLEM_SOLVING)
    const [activePlatform, setActivePlatform] = useState<DsaLink | DevLink>("leetcode")

    const tabChangeHandler = (tab: ProfileTabs) => {
        setActiveTab(tab)
        if(tab === PROFILE_TABS.PROBLEM_SOLVING){
            //If current platform is not a CP platform, set default to leetcode
            if(!dsaLinks.includes(activePlatform as DsaLink)){
                setActivePlatform("leetcode")
            }
        } 
        else if(tab === PROFILE_TABS.DEVELOPMENT){
            //If current platform is not a Dev platform, set default to github
            if(!devLinks.includes(activePlatform as DevLink)){
                setActivePlatform("github")
            }
        }
    }

    const platformChangeHandler = (platform: DsaLink | DevLink) => {
        setActivePlatform(platform)
    }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col w-full lg:w-3/4">
            <ProfileHeader user={user} activeTab={activeTab} onTabChange={tabChangeHandler} />
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