import Link from "next/link"
import { calculateYears, formatDate } from "@/lib/helper"
import { MapPin, Building2, CalendarDays, AlarmClock } from 'lucide-react';
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
                    <p className="text-gray-700">{profile.bio}</p>
                </div>
            )}
            <div className="flex flex-row gap-4 mb-6">
                <div className="flex-1 bg-cyan-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#1A1B2E]">{profile.publicRepos}</div>
                    <div className="text-gray-700">Repositories</div>
                </div>
                <div className="flex-1 bg-blue-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#1A1B2E]">{profile.followers}</div>
                    <div className="text-gray-700">Followers</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-[#1A1B2E] text-sm"><CalendarDays /></span>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Joined</div>
                        <div className="text-gray-700">{formatDate(profile.createdAt)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center">
                        <span className="text-[#1A1B2E] text-sm"><AlarmClock /></span>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">GitHub Age</div>
                        <div className="text-gray-700">{calculateYears(profile.createdAt)}</div>
                    </div>
                </div>
                </>
                {profile.location && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                            <span className="text-[#1A1B2E] text-sm"><MapPin /></span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="text-gray-700">{profile.location}</div>
                        </div>
                    </div>
                )}
                {profile.company && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center">
                            <span className="text-[#1A1B2E] text-sm"><Building2 /></span>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Company</div>
                            <div className="text-gray-700">{profile.company}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}