import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import HotelClassOutlinedIcon from '@mui/icons-material/HotelClassOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import type { ContestStatsProps } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import { formatNumber, formatRating, getRatingColor } from "@/lib/helper"

export const LeetCodeContest = ({ contest }: ContestStatsProps) => {
  const { totalContestAttended, rating, globalRanking, totalParticipants, topPercentage } = contest

  return (
    <div className="bg-white rounded-xl shadow-sm border m-2">
        <div className="mb-4">
            <div className="bg-[#1A1B2E] px-5 py-4 rounded-md mb-4">
                <h3 className="text-lg font-bold text-white leading-tight tracking-wider">Contest Performance</h3>
            </div>
            <div className="px-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <EmojiEventsOutlinedIcon className="text-yellow-600" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-700">Contest Rating</div>
                            <div className={`text-3xl font-black tracking-tight ${getRatingColor(rating)}`}>{formatRating(rating)}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <HotelClassOutlinedIcon className="text-blue-600" />
                        </div>
                        <div>
                              <div className="text-lg font-bold text-gray-900">{totalContestAttended}</div>
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contests</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <TrendingUpOutlinedIcon className="text-green-600" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">{topPercentage.toFixed(1)}%</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Top Percentage</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MilitaryTechOutlinedIcon className="text-purple-600" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">{formatNumber(globalRanking)}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Global Rank</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <PeopleOutlineOutlinedIcon className="text-orange-600" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-gray-900">{formatNumber(totalParticipants)}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Users</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-lg border border-indigo-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-800">
                            <span className="font-bold text-indigo-700">Performance:</span> Better than{" "}
                            <span className="font-black text-indigo-600 text-base">{(100 - topPercentage).toFixed(1)}%</span> of participants
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
