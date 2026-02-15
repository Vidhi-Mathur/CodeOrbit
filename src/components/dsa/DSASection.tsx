import DSAStats from "./DSAStats"
import { ShimmerCalendar, ShimmerContest, ShimmerProfile } from "../ui/ShimmerUI"
import type { SectionProps } from "@/interfaces/profileInterfaces"
import { type DsaLink, DSA_LINKS } from "@/constants/profileConstant"
import { useLeetcodeQuery } from "@/hooks/useLeetCode"
import { LeetCodeProfile } from "./leetcode/LeetCodeProfile"
import { LeetCodeContest } from "./leetcode/LeetCodeContest"
import { LeetCodeCalendar } from "./leetcode/LeetCodeCalendar"
import { CodeForcesProfile } from "./codeforces/CodeForcesProfile"
import { CodeForcesContest } from "./codeforces/CodeForcesContest"
import { CodeForcesProblemBreakdown } from "./codeforces/CodeForcesProblemBreakdown"
import { useCodeforcesQuery } from "@/hooks/useCodeForces"

export const DSASection = ({ user, activePlatform, onPlatformChange, renderSidebarOnly = false }: SectionProps) => {
    const isLeetcodeActive = activePlatform === DSA_LINKS.LEETCODE
    const { data: leetcodeData, isLoading: leetcodeLoading, error: leetcodeNetworkError } = useLeetcodeQuery(isLeetcodeActive? user.platforms.dsa.leetcode: undefined)
    const leetcodeProfile = leetcodeData?.profileResponse
    const leetcodeContest = leetcodeData?.contestResponse
    const leetcodeCalendar = leetcodeData?.submissionCalendarResponse
    const leetcodeApiErrors = leetcodeData?.errors

    const isCodeforcesActive = activePlatform === DSA_LINKS.CODEFORCES
    const { data: codeforcesData, isLoading: codeforcesLoading, error: codeforcesNetworkError } = useCodeforcesQuery(isCodeforcesActive? user.platforms.dsa.codeforces: undefined)
    const codeforcesProfile = codeforcesData?.profileResponse
    const codeforcesContest = codeforcesData?.contestResponse
    const codeforcesProblemBreakdown = codeforcesData?.problemBreakdownResponse
    const codeforcesApiErrors = codeforcesData?.errors

    const platformClickHandler = (platform: DsaLink) => {
        onPlatformChange(platform)
    }

    //Render sidebar content only
    if(renderSidebarOnly){
        if(activePlatform === DSA_LINKS.LEETCODE){
        return (
            <>
            {leetcodeLoading && (
                <>
                <ShimmerCalendar />
                <ShimmerContest />
                </>
            )}
            {!leetcodeLoading && (
                <>
                {leetcodeApiErrors?.calendar? (
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base m-2">
                        {leetcodeApiErrors?.calendar}
                    </div>
                    ): (
                    leetcodeCalendar && (
                    <div className="p-2 sm:p-3">
                        <LeetCodeCalendar
                            calendarMap={
                                typeof leetcodeCalendar === "object" && "submissionCalendar" in leetcodeCalendar
                                  ? { [new Date().getFullYear()]: leetcodeCalendar }
                                  : leetcodeCalendar}
                            />
                    </div>
                ))}
                {leetcodeApiErrors?.contest ? (
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base m-2">
                        {leetcodeApiErrors?.contest}
                    </div>
                    ): (
                    leetcodeContest && (
                        <div className="p-2 sm:p-3">
                            <LeetCodeContest contest={leetcodeContest} />
                        </div>
                    )
                )}
                </>
            )}
            </>
        )
    }
    else if(activePlatform === DSA_LINKS.CODEFORCES){
        return (
        <>
        {codeforcesLoading && (
            <>
            <ShimmerContest />
            </>
        )}
        {!codeforcesLoading && (
            <>
            {codeforcesApiErrors?.problemBreakdown? (
                <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base m-2">
                    {codeforcesApiErrors?.problemBreakdown}
                </div>
                ): (
                codeforcesProblemBreakdown && (
                <div className="p-2 sm:p-3">
                    <CodeForcesProblemBreakdown problemBreakdown={codeforcesProblemBreakdown} />
                </div>
            ))}
            
            </>
        )}
        </>
        )
    }
    return null
  }

    const renderMainContent = () => {
        if(activePlatform === DSA_LINKS.LEETCODE){
            return (
                <>
                {leetcodeLoading && <ShimmerProfile />}
                {leetcodeApiErrors?.profile? (
                    <div className="sm:-mt-15 lg:-mt-20 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                        {leetcodeApiErrors?.profile}
                    </div>
                ): (
                    leetcodeProfile && <LeetCodeProfile profile={leetcodeProfile} />
                )}
                </>
            )
        }
        else if(activePlatform === DSA_LINKS.CODEFORCES){
            return (
                <>
                {codeforcesLoading && (
                <>
                <ShimmerProfile />
                <ShimmerProfile />
                </>
            )}
                {codeforcesApiErrors?.profile? (
                    <div className="sm:-mt-15 lg:-mt-20 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                        {codeforcesApiErrors?.profile}
                    </div>
                ): (
                    codeforcesProfile && <CodeForcesProfile profile={codeforcesProfile} />
                )}
                {codeforcesApiErrors?.contest? (
                <div className="bg-red-50 ml-2 sm:ml-3 lg:ml-12 mt-3 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                    {codeforcesApiErrors?.contest}
                </div>
                ): (
                codeforcesContest && (
                    <div className="p-2 sm:p-3">
                        <CodeForcesContest contest={codeforcesContest} />
                    </div>
                )
            )} 
                </>
            )
        }

        return (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg m-3 sm:m-4 lg:m-6 sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
                    <p className="text-gray-600 capitalize">{activePlatform} integration is under development</p>
                </div>
            </div>
        )
    }

    return (
        <>
        <DSAStats onClick={platformClickHandler} activePlatform={activePlatform as DsaLink} />
        <div className="flex-1 m-3 sm:m-4 lg:m-6 lg:-mt-108">{renderMainContent()}</div>
        </>
    )
}
