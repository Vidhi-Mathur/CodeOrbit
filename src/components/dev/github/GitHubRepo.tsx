import Link from "next/link"
import type { GitHubRepoInterface } from "@/interfaces/dev/github/githubInterface"
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import { formatDate } from "@/lib/helper"

export const GitHubRepo = ({ repos }: { repos: GitHubRepoInterface[] }) => {
    return (
        <div className="space-y-3 sm:space-y-3 md:space-y-3 lg:space-y-4">
            {repos.map((repo) => {
                return (
                    <div className="bg-white rounded-xl sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-md overflow-hidden w-full max-w-[95%] mx-auto lg:ml-auto lg:mr-0 relative border border-cyan-300/70 hover:border-black" key={repo.name}>
                        <div className="bg-[#1A1B2E] px-3 sm:px-4 md:px-4 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-4">
                            <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white leading-tight tracking-wider">
                                {repo.name}
                            </h3>
                        </div>
                        <div className="bg-white px-3 sm:px-4 md:px-4 lg:px-5 py-3 sm:py-3 md:py-3 lg:py-4">
                            {repo.description && (
                                <p className="text-black text-xs sm:text-sm md:text-sm lg:text-sm leading-relaxed line-clamp-2 font-medium mb-2 sm:mb-2 md:mb-2 lg:mb-3">
                                    {repo.description}
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-start sm:items-center md:items-center lg:items-center justify-between gap-2 sm:gap-4 md:gap-4 lg:gap-4 mb-3 sm:mb-3 md:mb-3 lg:mb-4 text-xs sm:text-sm md:text-sm lg:text-sm">
                                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2">
                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 bg-[#1A1B2E] rounded-full"></div>
                                    <span className="text-gray-700 font-bold tracking-wide">{repo.language}</span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2">
                                    <CalendarMonthOutlinedIcon className="text-gray-400 text-sm sm:text-base md:text-base lg:text-base" />
                                    <span className="text-gray-500 font-medium tracking-wide">{formatDate(repo.created_at)}</span>
                                </div>
                            </div>
                            {repo.topics && repo.topics.length > 0 && (
                                <div className="mb-3 sm:mb-3 md:mb-3 lg:mb-4">
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2 lg:gap-2">
                                        {repo.topics.slice(0, 10).map((topic) => (
                                            <span key={topic} className="inline-block bg-cyan-100 text-black text-xs px-2 sm:px-2.5 md:px-2.5 lg:px-3 py-1 sm:py-1 md:py-1 lg:py-1.5 rounded-md sm:rounded-md md:rounded-md lg:rounded-lg font-bold border border-[#1A1B2E] tracking-wide">
                                                {topic}
                                            </span>
                                        ))}
                                        {repo.topics.length > 10 && (
                                            <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2 sm:px-2.5 md:px-2.5 lg:px-3 py-1 sm:py-1 md:py-1 lg:py-1.5 rounded-md sm:rounded-md md:rounded-md lg:rounded-lg font-bold border border-gray-200 tracking-wide">
                                                +{repo.topics.length - 10}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-2 sm:gap-3 md:gap-3 lg:gap-3">
                                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 bg-blue-200 text-black hover:bg-sky-300 font-bold text-xs sm:text-sm md:text-sm lg:text-sm py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-3 sm:px-3.5 md:px-3.5 lg:px-4 rounded-md sm:rounded-md md:rounded-md lg:rounded-lg transition-colors duration-200 flex-1 tracking-wide border border-gray-200 hover:border-[#1A1B2E]">
                                    <CodeOutlinedIcon className="text-sm sm:text-base md:text-base lg:text-base" />
                                    View Code
                                </Link>
                                {repo.homepage && (
                                    <Link href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm md:text-sm lg:text-sm py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-3 sm:px-3.5 md:px-3.5 lg:px-4 rounded-md sm:rounded-md md:rounded-md lg:rounded-lg transition-colors duration-200 border border-gray-200 hover:border-[#1A1B2E] flex-1 tracking-wide" >
                                        <OpenInNewOutlinedIcon className="text-sm sm:text-base md:text-base lg:text-base" />
                                        Live Demo
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
