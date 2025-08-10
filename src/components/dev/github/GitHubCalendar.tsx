"use client"
import { useState, useMemo } from "react"
import CodeIcon from "@mui/icons-material/Code"
import { ToolTip } from "@/components/ui/ToolTip"
import { formatDate, getIntensity, groupDatesByMonth } from "@/lib/helper"
import { GitHubCalendarProps } from "@/interfaces/dev/github/githubInterface"

const tooltipContent = (date: Date, count: number) => {
  return (
    <div>
        <div className="font-medium">
            {count} contribution{count !== 1 ? "s" : ""}
        </div>
        <div className="text-gray-300 text-xs font-medium">{formatDate(date.toISOString())}</div>
    </div>
  )
}

export const GitHubCalendar = ({ contributions }: GitHubCalendarProps) => {
    const allYears = contributions?.activeYears?.sort((a, b) => b - a) || []

    const [selectedYear, setSelectedYear] = useState<number>(allYears[0])

    const selectedYearData = contributions?.contributionCalendarResponse?.[selectedYear]

    //Flatten the weeks/contributionDays structure for the selected year
    const flattenedContributions = useMemo(() => {
        if(!selectedYearData?.weeks) return []
        return selectedYearData.weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({
                date: day.date,
                count: day.contributionCount,
                color: day.color,
                weekday: day.weekday,
            })),
        )
    }, [selectedYearData])

    const contributionsByDate = useMemo(() => {
        const map: Record<string, { count: number; color: string }> = {}
        flattenedContributions.forEach(({ date, count, color }) => {
            map[date] = { count, color }
        })
        return map
    }, [flattenedContributions])

    const monthGroups = useMemo(() => {
        const dates = flattenedContributions.map((c) => new Date(c.date))
        return groupDatesByMonth(dates)
    }, [flattenedContributions])

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = Number(e.target.value)
        setSelectedYear(year)
    }

    if(!contributions?.activeYears?.length){
        return (
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-base font-semibold mb-4">GitHub Contributions</h3>
                <p className="text-gray-500">No contribution data available</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-sm border relative m-1 sm:m-1.5 md:m-0 lg:m-2">
        <div className="mb-3 sm:mb-3 md:mb-3 lg:mb-4">
            <div className="bg-[#1A1B2E] px-3 sm:px-4 md:px-4 lg:px-5 py-2.5 sm:py-3 md:py-3 lg:py-4 rounded-md mb-3 sm:mb-3 md:mb-3 lg:mb-4">
                <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white leading-tight tracking-wide">
                    GitHub Contributions
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-3 lg:gap-4 text-xs sm:text-sm md:text-sm lg:text-sm px-2 sm:px-3 md:px-3 lg:px-4">
                <div className="flex flex-col items-center gap-1 text-center">
                    <div className="p-1.5 sm:p-2 md:p-2 lg:p-2 bg-blue-100 rounded-lg">
                        <CodeIcon className="text-blue-600" style={{ fontSize: "14px" }} />
                    </div>
                    <div className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-gray-900">
                        {selectedYearData?.totalContributions || 0}
                    </div>
                    <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Total submissions
                    </div>
                </div>
            </div>
        </div>
        {allYears.length > 1 && (
            <div className="mb-3 sm:mb-3 md:mb-3 lg:mb-4 px-2 sm:px-3 md:px-3 lg:px-4 m-1 sm:m-1.5 md:m-0 lg:m-2">
                <label className="block text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-700 mb-1 sm:mb-2 md:mb-2 lg:mb-2">
                    Year
                </label>
                <select className="border-2 border-gray-200 rounded-lg px-2 sm:px-3 md:px-3 lg:px-3 py-1.5 sm:py-2 md:py-2 lg:py-2 text-gray-900 font-medium focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base md:text-base lg:text-base" value={selectedYear} onChange={changeHandler}>
                    {allYears.map((year) => (
                        <option key={year} value={year} className="font-medium">
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        )}
        <div className="relative px-2 sm:px-3 md:px-3 lg:px-4 pb-2 sm:pb-3 md:pb-3 lg:pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-2 lg:gap-6">
                {monthGroups.map((monthGroup) => (
                    <div key={`${monthGroup.year}-${monthGroup.month}`}>
                        <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-semibold text-gray-600 text-center mb-1 sm:mb-1.5 md:mb-1 lg:mb-2 uppercase tracking-wider" style={{ minWidth: `${monthGroup.weeks.length * 12}px` }}>
                            {monthGroup.label}
                        </div>
                        <div className="flex gap-[1px] sm:gap-[1.5px] md:gap-[1px] lg:gap-[2px]">
                            {monthGroup.weeks.map((week, weekIndex) => (
                                <div key={`${monthGroup.year}-${monthGroup.month}-${weekIndex}`} className="flex flex-col gap-[1px] sm:gap-[1.5px] md:gap-[1px] lg:gap-[2px]">
                                    {week.map((date, dayIndex) => {
                                        if(!date){
                                            return <div key={`empty-${dayIndex}`} className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 lg:w-3 lg:h-3" />
                                        }
                                        const { count } = contributionsByDate[date.toISOString().slice(0, 10)] || { count: 0 };
                                        const intensity = getIntensity(count);
                                        return (
                                            <ToolTip key={date.toISOString()} placement="top" title={tooltipContent(date, count)}>
                                                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-black hover:ring-opacity-50 ${intensity}`} />
                                            </ToolTip>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    // <div className="bg-white rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl shadow-sm border relative m-1 sm:m-1.5 md:m-0 lg:m-2">
    //     <div className="relative px-2 sm:px-3 md:px-3 lg:px-4 pb-2 sm:pb-3 md:pb-3 lg:pb-4">
    //         {selectedYearData? (
    //             <div className="t">
    //                 {.map((monthGroup) => (
    //                     <div key={`${monthGroup.year}-${monthGroup.month}`}>
    //                         <div className="text-xs sm:text-xs md:text-xs lg:text-xs font-semibold text-gray-600 text-center mb-1 sm:mb-1.5 md:mb-1 lg:mb-2 uppercase tracking-wider" style={{ minWidth: `${monthGroup.weeks.length * 12}px` }}>
    //                             {monthGroup.label}
    //                         </div>
    //                         <div className="flex gap-[1px] sm:gap-[1.5px] md:gap-[1px] lg:gap-[2px]">
    //                             {monthGroup.weeks.map((week, weekIndex) => (
    //                                 <div key={`${monthGroup.year}-${monthGroup.month}-${weekIndex}`} className="flex flex-col gap-[1px] sm:gap-[1.5px] md:gap-[1px] lg:gap-[2px]">
    //                                     {week.map((date, dayIndex) => {
    //                                         if(!date){
    //                                             return (
    //                                                 <div key={`empty-${dayIndex}`} className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 lg:w-3 lg:h-3"/>
    //                                             )
    //                                         }
    //                                         const { count, color } = contributionsByDate[date.toISOString().slice(0, 10)] 
    //                                         return (
    //                                             <ToolTip key={date.toISOString()} placement="top" title={tooltipContent(date, count)}>
    //                                                 <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-black hover:ring-opacity-50" style={{ backgroundColor: color }}/>
    //                                             </ToolTip>
    //                                         )
    //                                     })}
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         ) : (
    //             <p className="text-gray-500 text-center py-8">No contribution data available for {selectedYear}</p>
    //         )}
    //     </div>
    // </div>
    )
}