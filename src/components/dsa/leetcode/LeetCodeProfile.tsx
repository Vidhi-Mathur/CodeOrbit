import Link from "next/link"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import type { LeetCodeProfileProps } from "@/interfaces/dsa/leetcode/leetcodeInterface";
import Image from "next/image";

export const LeetCodeProfile = ({ profile }: LeetCodeProfileProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[95%] ml-auto -mt-[75px] relative">
        <div className="bg-[#1A1B2E] p-5 text-white">
            <div className="flex items-center gap-4">
                <Link href={`https://leetcode.com/u/${profile.username}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                    <h2 className="text-2xl font-bold underline tracking-wider">{`@${profile.username}`}</h2>
                </Link>
            </div>
        </div>
        <div className="p-5">
            {profile.aboutMe && (
                <div className="mb-6">
                    <p className="text-gray-700 font-medium leading-relaxed">{profile.aboutMe}</p>
                </div>
            )}
            <div className="flex flex-row gap-4 mb-6">
                <div className="flex-1 bg-cyan-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-black text-[#1A1B2E] tracking-tight">{profile.ranking}</div>
                    <div className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Ranking</div>
                </div>
                <div className="flex-1 bg-blue-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-black text-[#1A1B2E] tracking-tight">{profile.reputation}</div>
                    <div className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Reputation</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <>
                    {profile.badges.length > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                                <MilitaryTechOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Badges</div>
                                <div className="flex items-center gap-1 flex-wrap">
                                    {profile.badges.slice(0, 5).map((badge) => (
                                        <Image src={badge.icon} width={40} height={40} alt={badge.name} key={badge.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-10 h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                            <LockOpenIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Problems Solved</div>
                            <div className="text-lg font-semibold text-gray-800 mb-1">{profile.submissionStats[0].count} Total</div>
                            <div className="flex gap-4 text-sm">
                              <span className="text-green-600 font-medium">{profile.submissionStats[1].count} Easy</span>
                              <span className="text-orange-500 font-medium">{profile.submissionStats[2].count} Medium</span>
                              <span className="text-red-500 font-medium">{profile.submissionStats[3].count} Hard</span>
                            </div>
                        </div>
                    </div> 
                    {profile.skillTags.length > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                                <span className="text-[#1A1B2E] text-sm"><StarBorderOutlinedIcon /></span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Skills</div>
                                <span className="text-gray-500">
                                    {profile.skillTags.join(", ")}
                                </span> 
                            </div>
                        </div>
                    )}
                </>
            </div> 
        </div>
    </div>
    )
}