import Link from "next/link"
import type { CodeForcesProfileProps } from "@/interfaces/dsa/codeforces/codeforcesInterface"

export const CodeForcesProfile = ({ profile }: CodeForcesProfileProps) => {
    return (
    <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative">
        <div className="bg-[#1A1B2E] p-3 sm:p-4 md:p-3 lg:p-5 text-white">
            <div className="flex items-center gap-3 sm:gap-3 md:gap-2 lg:gap-4">
                <Link href={`https://codeforces.com/profile/${profile.username}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                    <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-bold underline tracking-wider">{`@${profile.username}`}</h2>
                </Link>
            </div>
        </div>
        <div className="p-3 sm:p-4 md:p-3 lg:p-5">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 sm:gap-4 md:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                <div className="flex-1 bg-cyan-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                        {profile.currRank.toUpperCase()}
                    </div>
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                        Current Rank
                    </div>
                </div>
                <div className="flex-1 bg-blue-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                        {profile.maxRank.toUpperCase()}
                    </div>
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                        Maximum Rank
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}