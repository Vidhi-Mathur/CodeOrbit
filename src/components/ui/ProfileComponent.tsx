"use client"
import { useEffect, useState } from "react"
import type { ProfileComponentProps } from "@/interfaces/profileInterfaces"
import { PROFILE_TABS, ProfileTabs } from "@/constants/profileConstant"
import { useGitHub } from "@/hooks/useGitHub"
import { useLeetCode } from "@/hooks/useLeetCode"
import { About } from "@/components/ui/About"
import DSAStats from "@/components/dsa/DSAStats"
import { LeetCodeContest } from "../dsa/leetcode/LeetCodeContest"
import { LeetCodeProfile } from "@/components/dsa/leetcode/LeetCodeProfile"
import SubmissionCalendar from "../dsa/leetcode/SubmissionCalendar"
import DevStats from "@/components/dev/DevStats"
import { GitHubProfile } from "@/components/dev/github/GitHubProfile"
import { GitHubRepo } from "@/components/dev/github/GitHubRepo"
import { CurvedNav } from "@/components/ui/CuvedNav"
import { ShimmerContest, ShimmerProfile, ShimmerRepo, ShimmerSubmissionCalendar } from "@/components/ui/ShimmerUI"

const ProfileComponent = ({ user }: ProfileComponentProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTabs>(PROFILE_TABS.PROBLEM_SOLVING)
  const { githubProfile, repos, loading: githubLoading, error: githubError, fetchGitHubData } = useGitHub(user.platforms.dev.github)
  const { leetcodeProfile, contest, submissionCalendar, loading: leetcodeLoading, error: leetcodeError, fetchLeetCodeData } = useLeetCode(user.platforms.dsa.leetcode)

  useEffect(() => {
    if (activeTab === PROFILE_TABS.PROBLEM_SOLVING) fetchLeetCodeData()
    if (activeTab === PROFILE_TABS.DEVELOPMENT) fetchGitHubData()
  }, [activeTab])

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-y-auto scrollbar-hide">
        <div className="flex flex-col w-full lg:w-3/4">
            <div className="p-3 sm:p-4 lg:p-6 bg-white h-auto sm:h-auto lg:h-[calc(5/12*100vh)] pt-[72px] sm:pt-[70px] lg:pt-[80px] relative">
                <About name={user.name} username={user.username} image={user.image} email={user.email} education={user.education} info={user.platforms.others}/>
                <div className="absolute -bottom-3 sm:-bottom-3 lg:-bottom-4 left-0 right-0 z-10">
                    <CurvedNav activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>
            <div className="bg-blue-200 flex-1 lg:h-[calc(3/4*100vh)] overflow-y-auto scrollbar-hide">
                {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
                <>
                  <DSAStats onClick={fetchLeetCodeData} />
                    <div className="flex-1 m-3 sm:m-4 lg:m-6 lg:-mt-108">
                        {leetcodeLoading && <ShimmerProfile />}
                        {leetcodeError && (
                            <div className="-mt-10 sm:-mt-15 lg:-mt-20 bg-red-50 ml-6 sm:ml-8 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                                {leetcodeError}
                            </div>
                        )}
                    {!leetcodeLoading && !leetcodeError && leetcodeProfile && <LeetCodeProfile profile={leetcodeProfile} />}
                  </div>
                </>
                )}
                {activeTab === PROFILE_TABS.DEVELOPMENT && (
                <>
                    <DevStats onClick={fetchGitHubData} />
                    <div className="flex-1 m-3 sm:m-4 lg:m-6 lg:-mt-13">
                        {githubLoading && <ShimmerProfile />}
                        {githubError && (
                            <div className="-mt-10 sm:-mt-15 lg:-mt-20 bg-red-50 ml-6 sm:ml-8 lg:ml-12 p-3 sm:p-4 lg:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                                {githubError}
                            </div>
                        )}
                        {!githubLoading && !githubError && githubProfile && <GitHubProfile profile={githubProfile} />}
                    </div>
                </>
                )}
                <div className="block lg:hidden bg-cyan-200 mt-4">
                    {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
                        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                            {leetcodeLoading && (
                                <>
                                  <ShimmerSubmissionCalendar />
                                  <ShimmerContest />
                                </>
                            )}
                            {leetcodeError && (
                                <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                                    {leetcodeError}
                                </div>
                            )}
                            {!leetcodeLoading && !leetcodeError && (
                                <>
                                    {submissionCalendar && (
                                        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                                            <SubmissionCalendar calendarMap={typeof submissionCalendar === "object" && "submissionCalendar" in submissionCalendar? { [new Date().getFullYear()]: submissionCalendar }: submissionCalendar } />
                                        </div>
                                    )}
                                    {contest && (
                                        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                                            <LeetCodeContest contest={contest} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    {activeTab === PROFILE_TABS.DEVELOPMENT && (
                        <div className="p-3 sm:p-4">
                            {githubLoading && <ShimmerRepo />}
                            {githubError && (
                                <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200 text-red-700 text-sm sm:text-base">
                                    {githubError}
                                </div>
                            )}
                            {!githubLoading && !githubError && repos && <GitHubRepo repos={repos} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="hidden lg:block lg:w-1/4 bg-cyan-200 pt-[80px] overflow-y-auto h-screen scrollbar-hide">
            {activeTab === PROFILE_TABS.PROBLEM_SOLVING && (
            <>
                {leetcodeLoading && (
                  <>
                    <ShimmerSubmissionCalendar />
                    <ShimmerContest />
                  </>
                )}
                {leetcodeError && (
                    <div className="bg-red-50 p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700">
                        {leetcodeError}
                    </div>
                )}
                {!leetcodeLoading && !leetcodeError && (
                    <>
                        {submissionCalendar && (
                            <SubmissionCalendar calendarMap={typeof submissionCalendar === "object" && "submissionCalendar" in submissionCalendar? { [new Date().getFullYear()]: submissionCalendar }: submissionCalendar}/>
                        )}
                        {contest && <LeetCodeContest contest={contest} />}
                    </>
                )}
            </>
            )}
            {activeTab === PROFILE_TABS.DEVELOPMENT && (
                <>
                {githubLoading && <ShimmerRepo />}
                {githubError && (
                    <div className="bg-red-50 p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700">{githubError}</div>
                )}
                {!githubLoading && !githubError && repos && <GitHubRepo repos={repos} />}
                </>
            )}
        </div>
    </div>
    )
}

export default ProfileComponent