"use client"
import DevStats from "@/components/dev/DevStats"
import { GitHubProfile } from "@/components/dev/github/GitHubProfile"
import { GitHubRepo } from "@/components/dev/github/GitHubRepo"
import DSAStats from "@/components/dsa/DSAStats"
import { LeetCodeProfile } from "@/components/dsa/leetcode/LeetCodeProfile"
import { CurvedNav } from "@/components/ui/CuvedNav"
import { ShimmerProfile, ShimmerRepo } from "@/components/ui/ShimmerUI"
import { infoLinks, profileConstants } from "@/constants/profileConstant"
import { LeetcodeContestInterface, LeetCodeProfileInterface, type GitHubProfileInterface, type GitHubRepoInterface } from "@/interfaces/profileInterfaces"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Profile = () => {
    const [activeTab, setActiveTab] = useState(profileConstants[0].image);
    const [githubProfile, setGithubProfile] = useState<GitHubProfileInterface | null>(null)
    const [repos, setRepos] = useState<GitHubRepoInterface[]>([])
    const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfileInterface | null>(null);
    const [contest, setContest] = useState<LeetcodeContestInterface>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const handleClick = async(info: string) => {
        if(info === "github"){
            setIsLoading(true)
            setError(null)
            try {
                const response =  await axios.get('/api/dev/github/Vidhi-Mathur')
                const { profileResponse, reposResponse } = response.data
                setGithubProfile(profileResponse)
                setRepos(reposResponse)
            } 
            catch(err: any){
                console.error("API call failed", err)
                let message = err.response?.data?.error || "Failed to load GitHub profile"
                setError(message)
            } 
            finally{
                setIsLoading(false)
            }
        }
        else if(info === "leetcode"){
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get('/api/dsa/leetcode/VidhiMathur')
                const { profileResponse, contestResponse } = response.data
                setLeetcodeProfile(profileResponse)
                setContest(contestResponse)
            } 
            catch(err: any){
                console.error("API call failed", err)
                let message = err.response?.data?.error || "Failed to load Leetcode profile"
                setError(message)
            } 
            finally{
                setIsLoading(false)
            }
        }
    }
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex flex-col w-full md:w-3/4">
            <div className="p-6 bg-white h-[calc(5/12*100vh)] pt-[80px] relative">
                <About />
                <div className="absolute -bottom-4 left-0 right-0 z-10">
                  <CurvedNav activeTab={activeTab} setActiveTab={setActiveTab}/>
                </div>
            </div>
            <div className="bg-blue-200 h-[calc(3/4*100vh)] overflow-y-auto scrollbar-hide">
                {activeTab === profileConstants[0].image && (
                    <>
                    <DSAStats onClick={handleClick}/>
                    <div className="flex-1 m-6 -mt-95">
                        {isLoading && <ShimmerProfile />}
                        {error && <div className="-mt-20 bg-red-50 ml-12 p-4 rounded-lg border border-red-200 text-red-700">{error}</div>}
                        {!isLoading && !error && leetcodeProfile && <LeetCodeProfile profile={leetcodeProfile} />}
                    </div>
                    </>
                )}
                {activeTab === profileConstants[1].image && (
                    <>
                    <DevStats onClick={handleClick} />
                    <div className="flex-1 m-6">
                        {isLoading && <ShimmerProfile />}
                        {error && <div className="-mt-20 bg-red-50 ml-12 p-4 rounded-lg border border-red-200 text-red-700">{error}</div>}
                        {!isLoading && !error && githubProfile && <GitHubProfile profile={githubProfile} />}
                    </div>
                    </>
                )}
            </div>
        </div>
        <div className="hidden md:block md:w-1/4 bg-cyan-200 pt-[80px] overflow-y-auto h-screen scrollbar-hide">
            {activeTab === profileConstants[1].image && (
                <>
                {isLoading && <ShimmerRepo />}
                {error && <div className="bg-red-50 p-4 ml-2 mr-2 rounded-lg border border-red-200 text-red-700">{error}</div>}
                {!isLoading && !error && repos && <GitHubRepo repos={repos} />}
                </>
            )}
        </div>
      </div>
    )
}


const About = () => {
  return (
    <div className="text-black">
        <div className="flex flex-col md:flex-row items-start md:items-start gap-2 justify-between">
            <div className="flex flex-col gap-2">
                <div className="relative rounded-full w-24 h-24 overflow-hidden">
                    <Image className="object-cover" src="/bg/profile.png" alt="Profile" fill />
                </div>
                <div className="mt-2">
                    <h2 className="text-xl font-semibold">User's full name</h2>
                    <p className="text-gray-600">@username</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 -mt-4 md:-mt-3">
                {infoLinks.map((info) => ( 
                    <Link href="/" key={info} className="p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center">
                        <Image src={`/common/${info}.svg`} width={24} height={24} alt={info} />
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Profile