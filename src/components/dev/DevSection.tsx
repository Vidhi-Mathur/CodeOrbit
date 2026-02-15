import type { SectionProps } from "@/interfaces/profileInterfaces"
import { type DsaLink, type DevLink } from "@/constants/profileConstant"
import { useGithubQuery } from "@/hooks/useGitHub"
import DevStats from "@/components/dev/DevStats"
import { GitHubProfile } from "@/components/dev/github/GitHubProfile"
import { GitHubRepo } from "@/components/dev/github/GitHubRepo"
import { ShimmerProfile, ShimmerRepo, ShimmerCalendar } from "@/components/ui/ShimmerUI"
import { GitHubCalendar } from "./github/GitHubCalendar"

export const DevSection = ({ user, activePlatform, onPlatformChange, renderSidebarOnly = false }: SectionProps) => {
    const isGithubActive = activePlatform === "github"
    const { data, isLoading: githubLoading, error: githubNetworkError } = useGithubQuery(isGithubActive? user.platforms.dev.github: undefined)
    const githubProfile = data?.profileResponse
    const repos = data?.reposResponse
    const calendar = data?.calendarResponse
    const githubApiError = data?.errors

    const platformClickHandler = (platform: DsaLink | DevLink) => {
        onPlatformChange(platform)
    }

    if(githubNetworkError){
        return (
            <div className="bg-red-50 p-3 sm:p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                "Failed to fetch GitHub data. Please try again."
            </div>
        )
    }
    
    if(renderSidebarOnly){
        return (
            <>
            {githubLoading && <ShimmerCalendar />}
            {githubApiError?.calendar ? (
                <div className="bg-red-50 p-3 sm:p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                    {githubApiError?.calendar || "Failed to load contribution calendar"}
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
            {githubApiError?.profile? (
                <div className="sm:-mt-15 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                    {githubApiError?.profile || "Failed to load GitHub profile and repos"}
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