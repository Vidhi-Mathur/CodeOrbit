import Link from "next/link"
import { calculateYears, formatDate } from "@/lib/helper"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import type { GitHubProfileProps } from "@/interfaces/dev/github/githubInterface"

export const GitHubProfile = ({ profile }: GitHubProfileProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[95%] ml-auto -mt-[75px] relative">
        <div className="bg-[#1A1B2E] p-5 text-white">
            <div className="flex items-center gap-4">
                <Link href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                    <h2 className="text-2xl font-bold underline">{`@${profile.login}`}</h2>
                </Link>
            </div>
        </div>
        <div className="p-5">
            {profile.bio && (
                <div className="mb-6">
                    <p className="text-gray-700 font-medium leading-relaxed">{profile.bio}</p>
                </div>
            )}
            <div className="flex flex-row gap-4 mb-6">
                <div className="flex-1 bg-cyan-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-black text-[#1A1B2E] tracking-tight">{profile.publicRepos}</div>
                    <div className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Repositories</div>
                </div>
                <div className="flex-1 bg-blue-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-black text-[#1A1B2E] tracking-tight">{profile.followers}</div>
                    <div className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Followers</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                        <CalendarMonthOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-700 uppercase tracking-wider">Joined</div>
                        <div className="text-gray-700 font-medium">{formatDate(profile.createdAt)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                        <AlarmOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-700 uppercase tracking-wider">GitHub Age</div>
                        <div className="text-gray-700 font-medium">{calculateYears(profile.createdAt)}</div>
                    </div>
                </div>
                </>
                {profile.location && (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                            <LocationOnOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 uppercase tracking-wider">Location</div>
                            <div className="text-gray-700 font-medium">{profile.location}</div>
                        </div>
                    </div>
                )}
                {profile.company && (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                            <ApartmentOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: "30px" }} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 uppercase tracking-wider">Company</div>
                            <div className="text-gray-700 font-medium">{profile.company}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}