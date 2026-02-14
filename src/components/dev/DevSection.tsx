"use client"
import { useEffect } from "react"
import type { SectionProps } from "@/interfaces/profileInterfaces"
import { type DsaLink, type DevLink, devLinks } from "@/constants/profileConstant"
import { useGitHub } from "@/hooks/useGitHub"
import DevStats from "@/components/dev/DevStats"
import { GitHubProfile } from "@/components/dev/github/GitHubProfile"
import { GitHubRepo } from "@/components/dev/github/GitHubRepo"
import { ShimmerProfile, ShimmerRepo, ShimmerCalendar } from "@/components/ui/ShimmerUI"
import { GitHubCalendar } from "./github/GitHubCalendar"

export const DevSection = ({ user, activePlatform, onPlatformChange, renderSidebarOnly = false, refresh }: SectionProps) => {
    const { githubProfile, repos, loading: githubLoading, calendar, errors: githubError, fetchGitHubData } = useGitHub(user.platforms.dev.github)

    const platformClickHandler = (platform: DsaLink | DevLink) => {
        onPlatformChange(platform)
    }
    
    useEffect(() => {
        if(devLinks.includes(activePlatform as DevLink)){
            switch(activePlatform as DevLink){
                case "github":
                    fetchGitHubData()
                    break
            }
        }
    }, [activePlatform, refresh])
    
    if(renderSidebarOnly){
        return (
            <>
            {githubLoading && <ShimmerCalendar />}
            {githubError.calendar? (
                <div className="bg-red-50 p-3 sm:p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                    {githubError.calendar || "Failed to load contribution calendar"}
                </div>
            ): calendar && (
                <div className="p-2 sm:p-3">
                    <GitHubCalendar contributions={calendar} />
                </div>
            )} 
            </>
        )
    }
    
    const renderMainContent = () => {
        return (
            <>
            {githubLoading && (
                <div className="space-y-4">
                    <ShimmerProfile />
                    <ShimmerRepo />
                </div>
            )}
            {githubError.profile? (
                <div className="sm:-mt-15 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                    {githubError.profile || "Failed to load GitHub profile and repos"}
                </div>
            ): (
            <div className="space-y-4">
                {githubProfile && <GitHubProfile profile={githubProfile} />}
                {repos && <GitHubRepo repos={repos} />}
            </div>
            )}
          </>
        )
    }

    return (
        <>
        <DevStats onClick={platformClickHandler} activePlatform={activePlatform} />
        <div className="flex-1 m-3 sm:m-4 lg:m-6 lg:-mt-13">{renderMainContent()}</div>
        </>
    )
}
