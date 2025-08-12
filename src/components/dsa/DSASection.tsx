"use client"
import { useEffect } from "react"
import type { SectionProps } from "@/interfaces/profileInterfaces"
import { type DsaLink, type DevLink, dsaLinks } from "@/constants/profileConstant"
import { useLeetCode } from "@/hooks/useLeetCode"
import DSAStats from "@/components/dsa/DSAStats"
import { LeetCodeProfile } from "@/components/dsa/leetcode/LeetCodeProfile"
import { LeetCodeContest } from "../dsa/leetcode/LeetCodeContest"
import { LeetCodeCalendar } from "./leetcode/LeetCodeCalendar"
import { ShimmerProfile, ShimmerCalendar, ShimmerContest } from "@/components/ui/ShimmerUI"
import { useCodeForces } from "@/hooks/useCodeForces"
import { CodeForcesProfile } from "./codeforces/CodeForcesProfile"

export const DSASection = ({ user, activePlatform, onPlatformChange, renderSidebarOnly = false }: SectionProps) => {
    const { profile: leetcodeProfile, contest: leetcodeContest, calendar: leetcodeCalendar, loading: leetcodeLoading, errors: leetcodeErrors, fetchLeetCodeData } = useLeetCode(user.platforms.dsa.leetcode)
    const { profile: codeforcesProfile, loading: codeforcesLoading, errors: codeforcesErrors, fetchCodeForcesData } = useCodeForces(user.platforms.dsa.codeforces)

    const platformClickHandler = (platform: DsaLink | DevLink) => {
        onPlatformChange(platform)
        if(dsaLinks.includes(platform as DsaLink)){
            switch(platform as DsaLink){
                case "leetcode":
                    fetchLeetCodeData()
                    break
                case "codeforces":
                    fetchCodeForcesData()
                    break
                default:
                    console.log("Implement Handler")
            }     
        }
    }

    useEffect(() => {
        if(dsaLinks.includes(activePlatform as DsaLink)){
            platformClickHandler(activePlatform)
        }
    }, [activePlatform])

    //Render sidebar content only
    if(renderSidebarOnly){
        if(activePlatform === "leetcode"){
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
                {leetcodeErrors.calendar? (
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base ml-2 mr-2">
                        {leetcodeErrors.calendar}
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
                {leetcodeErrors.contest ? (
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base ml-2 mr-2">
                        {leetcodeErrors.contest}
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
    // else if(activePlatform === "codeforces"){
    //     return (
    //     <>
    //     {codeforcesLoading && (
    //         <>
    //         <ShimmerCalendar />
    //         <ShimmerContest />
    //         </>
    //     )}
    //     {!codeforcesLoading && (
    //         <>
    //         {codeforcesErrors.calendar? (
    //             <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base ml-2 mr-2">
    //                 {codeforcesErrors.calendar}
    //             </div>
    //             ): (
    //             codeforcesCalendar && (
    //             <div className="p-2 sm:p-3">
    //                 <CodeForcesCalendar
    //                     calendarMap={
    //                         typeof codeforcesCalendar === "object" && "submissionCalendar" in codeforcesCalendar
    //                           ? { [new Date().getFullYear()]: codeforcesCalendar }
    //                           : codeforcesCalendar}
    //                     />
    //             </div>
    //         ))}
    //         {codeforcesErrors.contest ? (
    //             <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base ml-2 mr-2">
    //                 {codeforcesErrors.contest}
    //             </div>
    //             ): (
    //             codeforcesContest && (
    //                 <div className="p-2 sm:p-3">
    //                     <CodeForcesContest contest={codeforcesContest} />
    //                 </div>
    //             )
    //         )}
    //         </>
    //     )}
    //     </>
    //     )
    // }
    return null
  }

    const renderMainContent = () => {
        if(activePlatform === "leetcode"){
            return (
                <>
                {leetcodeLoading && <ShimmerProfile />}
                {leetcodeErrors.profile? (
                    <div className="sm:-mt-15 lg:-mt-20 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                        {leetcodeErrors.profile}
                    </div>
                ): (
                    leetcodeProfile && <LeetCodeProfile profile={leetcodeProfile} />
                )}
                </>
            )
        }
        else if(activePlatform === "codeforces"){
            return (
                <>
                {codeforcesLoading && <ShimmerProfile />}
                {codeforcesErrors.profile? (
                    <div className="sm:-mt-15 lg:-mt-20 bg-red-50 ml-2 sm:ml-3 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                        {codeforcesErrors.profile}
                    </div>
                ): (
                    codeforcesProfile && <CodeForcesProfile profile={codeforcesProfile} />
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
        <DSAStats onClick={platformClickHandler} activePlatform={activePlatform} />
        <div className="flex-1 m-3 sm:m-4 lg:m-6 lg:-mt-108">{renderMainContent()}</div>
        </>
    )
}
