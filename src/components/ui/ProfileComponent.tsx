"use client"
import DevStats from "@/components/dev/DevStats"
import { GitHubProfile } from "@/components/dev/github/GitHubProfile"
import { GitHubRepo } from "@/components/dev/github/GitHubRepo"
import DSAStats from "@/components/dsa/DSAStats"
import { LeetCodeProfile } from "@/components/dsa/leetcode/LeetCodeProfile"
import { About } from "@/components/ui/About"
import { CurvedNav } from "@/components/ui/CuvedNav"
import { ShimmerProfile, ShimmerRepo } from "@/components/ui/ShimmerUI"
import { profileConstants } from "@/constants/profileConstant"
import { useGitHub } from "@/hooks/useGitHub"
import { useLeetCode } from "@/hooks/useLeetCode"
import { ProfileComponentProps } from "@/interfaces/profileInterfaces"
import { useEffect, useState } from "react"
import { LeetcodeDetail } from "../dsa/leetcode/LeetCodeDetail"

const ProfileComponent = ({ user }: ProfileComponentProps) => {
  const [activeTab, setActiveTab] = useState(profileConstants[0].image)
  const { githubProfile, repos, loading: githubLoading, error: githubError, fetchGitHubData } = useGitHub(user.platforms.dev.github)
  const { leetcodeProfile, contest, submissionCalendar, loading: leetcodeLoading, error: leetcodeError, fetchLeetCodeData } = useLeetCode(user.platforms.dsa.leetcode)

  useEffect(() => {
    if (activeTab === profileConstants[0].image) fetchLeetCodeData()
    if (activeTab === profileConstants[1].image) fetchGitHubData()
  }, [activeTab])

      return (
        <div className="flex h-screen w-full overflow-hidden">
          <div className="flex flex-col w-full md:w-3/4">
              <div className="p-6 bg-white h-[calc(5/12*100vh)] pt-[80px] relative">
                  <About name={user.name} username={user.username} image={user.image} email={user.email} education={user.education} info={user.platforms.others}/>
                  <div className="absolute -bottom-4 left-0 right-0 z-10">
                    <CurvedNav activeTab={activeTab} setActiveTab={setActiveTab}/>
                  </div>
              </div>
              <div className="bg-blue-200 h-[calc(3/4*100vh)] overflow-y-auto scrollbar-hide">
                  {activeTab === profileConstants[0].image && (
                      <>
                      <DSAStats onClick={fetchLeetCodeData}/>
                      <div className="flex-1 m-6 -mt-95">
                          {leetcodeLoading && <ShimmerProfile />}
                          {leetcodeError && <div className="-mt-20 bg-red-50 ml-12 p-4 rounded-lg border border-red-200 text-red-700">{leetcodeError}</div>}
                          {!leetcodeLoading && !leetcodeError && leetcodeProfile && <LeetCodeProfile profile={leetcodeProfile} />}
                      </div>
                      </>
                  )}
                  {activeTab === profileConstants[1].image && (
                      <>
                      <DevStats onClick={fetchGitHubData} />
                      <div className="flex-1 m-6">
                          {githubLoading && <ShimmerProfile />}
                          {githubError && <div className="-mt-20 bg-red-50 ml-12 p-4 rounded-lg border border-red-200 text-red-700">{githubError}</div>}
                          {!githubLoading && !githubError && githubProfile && <GitHubProfile profile={githubProfile} />}
                      </div>
                      </>
                  )}
              </div>
            </div>
            <div className="hidden md:block md:w-1/4 bg-cyan-200 pt-[80px] overflow-y-auto h-screen scrollbar-hide">
                {activeTab === profileConstants[0].image && (
                    <>
                    {leetcodeLoading && <ShimmerRepo />}
                    {leetcodeError && <div className="bg-red-50 p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700">{leetcodeError}</div>}
                    {!leetcodeLoading && !leetcodeError && leetcodeProfile && contest && submissionCalendar && <LeetcodeDetail contest={contest} submissionCalendar={submissionCalendar} />}
                    </>
                )}
                {activeTab === profileConstants[1].image && (
                    <>
                    {githubLoading && <ShimmerRepo />}
                    {githubError && <div className="bg-red-50 p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700">{githubError}</div>}
                    {!githubLoading && !githubError && repos && <GitHubRepo repos={repos} />}
                    </>
                )}
            </div>
        </div>
      )
  }
  
  export default ProfileComponent