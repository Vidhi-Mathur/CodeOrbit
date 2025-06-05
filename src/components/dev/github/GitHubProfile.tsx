import Link from "next/link"
import { calculateYears, formatDate } from "@/lib/helper"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined"
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined"
import type { GitHubProfileProps } from "@/interfaces/dev/github/githubInterface"

export const GitHubProfile = ({ profile }: GitHubProfileProps) => {
    return (
        <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-[95%] ml-auto relative">
            <div className="bg-[#1A1B2E] p-3 sm:p-4 md:p-3 lg:p-5 text-white">
                <div className="flex items-center gap-3 sm:gap-3 md:gap-2 lg:gap-4">
                    <Link href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-200 transition-colors">
                        <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-bold underline">{`@${profile.login}`}</h2>
                    </Link>
                </div>
            </div>
            <div className="p-3 sm:p-4 md:p-3 lg:p-5">
                {profile.bio && (
                    <div className="mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                        <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base md:text-sm lg:text-base">
                            {profile.bio}
                        </p>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 sm:gap-4 md:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                    <div className="flex-1 bg-cyan-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                        <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                            {profile.publicRepos}
                        </div>
                        <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                            Repositories
                        </div>
                    </div>
                    <div className="flex-1 bg-blue-200 p-3 sm:p-3.5 md:p-3 lg:p-4 rounded-lg text-center">
                        <div className="text-xl sm:text-xl md:text-lg lg:text-2xl font-black text-[#1A1B2E] tracking-tight">
                            {profile.followers}
                        </div>
                        <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-xs lg:text-sm uppercase tracking-wider">
                            Followers
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3 md:gap-3 lg:gap-4">
                    <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-blue-200 rounded-full flex items-center justify-center">
                            <CalendarMonthOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: window.innerWidth < 640? "20px": window.innerWidth < 768? "20px": window.innerWidth < 1024? "20px": "30px"}} />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">
                                Joined
                            </div>
                            <div className="text-gray-700 font-medium text-sm sm:text-base md:text-sm lg:text-base">
                                {formatDate(profile.createdAt)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                            <AlarmOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: window.innerWidth < 640? "20px": window.innerWidth < 768? "20px": window.innerWidth < 1024 ? "20px": "30px" }} />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">
                                GitHub Age
                            </div>
                            <div className="text-gray-700 font-medium text-sm sm:text-base md:text-sm lg:text-base">
                                {calculateYears(profile.createdAt)}
                            </div>
                        </div>
                    </div>
                    {profile.location && (
                        <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-blue-200 rounded-full flex items-center justify-center">
                                <LocationOnOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: window.innerWidth < 640? "20px": window.innerWidth < 768? "20px": window.innerWidth < 1024? "20px": "30px" }} />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Location
                                </div>
                                <div className="text-gray-700 font-medium text-sm sm:text-base md:text-sm lg:text-base">
                                    {profile.location}
                                </div>
                            </div>
                        </div>
                    )}
                    {profile.company && (
                        <div className="flex items-center gap-2 sm:gap-2 md:gap-2 lg:gap-2">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                                <ApartmentOutlinedIcon className="text-[#1A1B2E]" style={{ fontSize: window.innerWidth < 640? "20px": window.innerWidth < 768? "20px": window.innerWidth < 1024? "20px": "30px" }} />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Company
                                </div>
                                <div className="text-gray-700 font-medium text-sm sm:text-base md:text-sm lg:text-base">
                                    {profile.company}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}