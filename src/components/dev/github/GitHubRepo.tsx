import Link from "next/link"
import type { GitHubRepoInterface } from "@/interfaces/profileInterfaces"
import { Code2, ExternalLink, Calendar } from "lucide-react"
import { formatDate } from "@/lib/helper"

export const GitHubRepo = ({ repos }: { repos: GitHubRepoInterface[] }) => {
  return (
    <div className="space-y-4 px-3 mb-4">
        {repos.map((repo) => {
            return (
                <div className="bg-white border border-cyan-300/70 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:border-black" key={repo.name}>
                    <div className="bg-[#1A1B2E] px-5 py-4">
                        <h3 className="text-lg font-bold text-white leading-tight tracking-wide">{repo.name}</h3>
                    </div>
                    <div className="bg-white px-5 py-4">
                        {repo.description && (
                            <p className="text-black text-sm leading-relaxed line-clamp-2 font-medium mb-3">{repo.description}</p>
                        )}
                        <div className="flex items-center justify-between gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-[#1A1B2E] rounded-full"></div>
                                <span className="text-gray-700 font-semibold tracking-wide">{repo.language}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-500 font-medium tracking-wide">{formatDate(repo.created_at)}</span>
                            </div>
                        </div>
                        {repo.topics && repo.topics.length > 0 && (
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {repo.topics.slice(0, 3).map((topic) => (
                                        <span key={topic} className="inline-block bg-cyan-100 text-black text-xs px-3 py-1.5 rounded-lg font-medium border border-[#1A1B2E] tracking-wide">
                                            {topic}
                                        </span>
                                    ))}
                                    {repo.topics.length > 3 && (
                                        <span className="inline-block bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-semibold border border-gray-200 tracking-wide">
                                            +{repo.topics.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="flex gap-3">
                            <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-blue-200 text-black hover:bg-sky-300 font-semibold text-sm py-3 px-4 rounded-lg transition-colors duration-200 flex-1 tracking-wide border border-gray-200 hover:border-[#1A1B2E]">
                                <Code2 className="w-4 h-4" />
                                View Code
                            </Link>
                            {repo.homepage && (
                                <Link href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3 px-4 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-[#1A1B2E] flex-1 tracking-wide">
                                    <ExternalLink className="w-4 h-4" />
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
