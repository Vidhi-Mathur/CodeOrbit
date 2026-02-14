import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined"
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined"
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined"
import type { ContestStatsProps } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import { formatNumber, formatRating, getRatingColor } from "@/lib/helper"

export const LeetCodeContest = ({ contest }: ContestStatsProps) => {
  const { totalContestAttended, rating, globalRanking, totalParticipants, topPercentage } = contest
  const hasContests = !!contest && (contest.totalContestAttended ?? 0) > 0;

  return (
    <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-sm border m-1 sm:m-1.5 md:m-0 lg:m-2">
        <div className="mb-3 sm:mb-3 md:mb-3 lg:mb-4">
            <div className="bg-[#1A1B2E] px-3 sm:px-4 md:px-4 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-4 rounded-md mb-3 sm:mb-3 md:mb-3 lg:mb-4">
                <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white leading-tight tracking-wider">
                    Contest Performance
                </h3>
            </div>
            <div className="px-2 sm:px-3 md:px-3 lg:px-4 space-y-3 sm:space-y-3 md:space-y-3 lg:space-y-4">
                {!hasContests? (
                    <div className="flex items-center justify-center h-24 sm:h-32 md:h-40 lg:h-48">
                        <p className="text-gray-500 text-sm sm:text-base md:text-sm lg:text-base">💡No contest attended yet!!!</p>
                    </div>
                ): (
                    <>
                    <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-2.5 lg:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3">
                            <div className="p-1.5 sm:p-2 md:p-2 lg:p-2 bg-yellow-100 rounded-lg">
                                <EmojiEventsOutlinedIcon className="text-yellow-600" style={{ fontSize: "18px" }} />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-700">
                                    Contest Rating
                                </div>
                                <div className={`text-xl sm:text-2xl md:text-xl lg:text-3xl font-black tracking-tight ${getRatingColor(rating)}`}>
                                    {formatRating(rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-3 lg:gap-4">
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-blue-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-blue-100 rounded-lg">
                                <HotelClassOutlinedIcon className="text-blue-600" style={{ fontSize: "16px" }} />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base md:text-sm lg:text-lg font-bold text-gray-900">
                                    {totalContestAttended}
                                </div>
                                <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Contests
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-green-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-green-100 rounded-lg">
                                <TrendingUpOutlinedIcon className="text-green-600" style={{ fontSize: "16px" }} />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base md:text-sm lg:text-lg font-bold text-gray-900">
                                    {topPercentage != null ? `${topPercentage.toFixed(1)}%` : "—"}
                                </div>
                                <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Top Percentage
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-purple-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-purple-100 rounded-lg">
                                <MilitaryTechOutlinedIcon className="text-purple-600" style={{ fontSize: "16px" }} />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base md:text-sm lg:text-lg font-bold text-gray-900">
                                    {formatNumber(globalRanking)}
                                </div>
                                <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Global Rank
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 p-2 sm:p-2.5 md:p-2 lg:p-3 bg-orange-50 rounded-lg">
                            <div className="p-1.5 sm:p-2 md:p-1.5 lg:p-2 bg-orange-100 rounded-lg">
                                <PeopleOutlineOutlinedIcon className="text-orange-600" style={{ fontSize: "16px" }} />
                            </div>
                            <div>
                                <div className="text-sm sm:text-base md:text-sm lg:text-lg font-bold text-gray-900">
                                    {formatNumber(totalParticipants)}
                                </div>
                                <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Total Users
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-3 md:mt-3 lg:mt-4 p-2 sm:p-2.5 md:p-2.5 lg:p-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-lg border border-indigo-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="text-xs sm:text-sm md:text-sm lg:text-sm font-medium text-gray-800">
                                <span className="font-bold text-indigo-700">Performance:</span> Better than{" "}
                                <span className="font-black text-indigo-600 text-sm sm:text-base md:text-sm lg:text-base">
                                    {topPercentage != null ? `${(100 - topPercentage).toFixed(1)}%` : "—"}
                                </span>{" "}
                                of participants
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    </div>
    )
}
