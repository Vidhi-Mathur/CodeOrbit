import Link from "next/link"
import Image from "next/image"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined"
import type { LeetCodeProfileProps } from "@/interfaces/dsa/leetcode/leetcodeInterface"

export const LeetCodeProfile = ({ profile }: LeetCodeProfileProps) => {
    return (
    <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-[95%] ml-auto relative">
        <div className="bg-[#1A1B2E] p-3 sm:p-4 md:p-3 lg:p-5 text-white">
            <div className="flex items-center gap-3 sm:gap-3 md:gap-2 lg:gap-4">
                <Link href={`https://leetcode.com/u/${profile.username}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                    <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-bold underline tracking-wider">{`@${profile.username}`}</h2>
                </Link>
            </div>
        </div>
        <div className="p-3 sm:p-4 md:p-3 lg:p-5">
            {profile.aboutMe && (
                <div className="mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                    <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base md:text-sm lg:text-base">
                        {profile.aboutMe}
                    </p>
                </div>
            )}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 sm:gap-4 md:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                <div className="flex-1 bg-cyan-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                        {profile.ranking}
                    </div>
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                        Ranking
                    </div>
                </div>
                <div className="flex-1 bg-blue-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                    <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                        {profile.reputation}
                    </div>
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                        Reputation
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3 md:gap-3 lg:gap-4">
                {profile.badges.length > 0 && (
                    <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-blue-200 rounded-full flex items-center justify-center">
                            <MilitaryTechOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "20px" }} />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 mb-1 sm:mb-1.5 md:mb-1 lg:mb-2 uppercase tracking-wider">
                                Badges
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                                {profile.badges.slice(0, 5).map((badge) => (
                                    <Image src={badge.icon} width={28} height={28} className="sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-10 lg:h-10" alt={badge.name} key={badge.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 mt-2 sm:mt-3 md:mt-2 lg:mt-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                        <LockOpenIcon className="text-[#1A1B2E]" style={{ fontSize: "20px" }} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 mb-1 sm:mb-1.5 md:mb-1 lg:mb-2 uppercase tracking-wider">
                            Problems Solved
                        </div>
                        <div className="text-base sm:text-lg md:text-base lg:text-lg font-semibold text-gray-800 mb-1">
                            {profile.submissionStats[0].count} Total
                        </div>
                        <div className="flex gap-2 sm:gap-3 md:gap-2 lg:gap-4 text-xs sm:text-sm md:text-xs lg:text-sm">
                            <span className="text-green-600 font-medium">{profile.submissionStats[1].count} Easy</span>
                            <span className="text-orange-500 font-medium">{profile.submissionStats[2].count} Medium</span>
                            <span className="text-red-500 font-medium">{profile.submissionStats[3].count} Hard</span>
                        </div>
                    </div>
                </div>
                {profile.skillTags.length > 0 && (
                    <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-blue-200 rounded-full flex items-center justify-center">
                            <StarBorderOutlinedIcon style={{ fontSize: "16px" }} className="text-[#1A1B2E]" />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm md:text-xs lg:text-sm text-gray-500">
                                Skills
                            </div>
                            <span className="text-gray-500 text-xs sm:text-sm md:text-xs lg:text-base">
                                {profile.skillTags.join(", ")}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}