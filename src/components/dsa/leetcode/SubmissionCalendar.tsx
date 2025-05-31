"use client"
import type { SubmissionCalendarProps } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import { formatDate, generateDates, getIntensity, groupDatesByMonth } from "@/lib/helper"
import CodeIcon from "@mui/icons-material/Code"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import { useMemo, useState } from "react"
import { ToolTip } from "../../ui/ToolTip"

let tooltipContent = (date: Date, count: number) => {
    return (
        <div>
            <div className="font-medium">
                {count} submission{count !== 1 ? "s" : ""}
            </div>
            <div className="text-gray-300 text-xs font-medium">
                {formatDate(date.toISOString())}
            </div>
        </div>
    )
}

const SubmissionCalendar = ({calendarMap}: SubmissionCalendarProps) => {
    const allYears = Object.keys(calendarMap).map(Number).sort((a, b) => b - a)

    //To select year 
    const [selectedYear, setSelectedYear] = useState<number>(allYears[0])

    //For current year
    let currentYearCalendar = calendarMap[selectedYear]

    let { submissionCalendar, totalActiveDays, streak } = currentYearCalendar

    //Parse the JSON string to get the submission data
    const submissionData: Record<string, number> = useMemo(() => {
        try {
            return JSON.parse(submissionCalendar)
        } 
        catch(err){
            console.error("Failed to parse submission calendar:", err)
        return {}
        }
    }, [submissionCalendar])

    //Get dates for the selected year
    const dates = useMemo(() => generateDates(selectedYear), [selectedYear])

    //Group dates by month and weeks
    const monthGroups = useMemo(() => groupDatesByMonth(dates), [dates])

    //Get submission count for a specific date
    const getSubmissionCount = (date: Date) => {
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
        const timestamp = Math.floor(utcDate.getTime() / 1000).toString()
        return submissionData[timestamp] || 0
    }

    //Calculate total submissions
    const totalSubmissions = useMemo(() => 
        Object.values(submissionData).reduce((sum, count) => sum + count, 0)
    , [submissionData])

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = Number(e.target.value)
        setSelectedYear(year)
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border relative m-2">
            <div className="mb-4">
                <div className="bg-[#1A1B2E] px-5 py-4 rounded-md mb-4">
                    <h3 className="text-lg font-bold text-white leading-tight tracking-wide">
                        Submission Activity
                    </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm px-4">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CodeIcon className="text-blue-600" style={{ fontSize: "18px" }} />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{totalSubmissions}</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total submissions</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CalendarTodayIcon className="text-green-600" style={{ fontSize: "18px" }} />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{totalActiveDays}</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Active Days</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <LocalFireDepartmentIcon className="text-orange-600" style={{ fontSize: "18px" }} />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{streak}</div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Longest streak</div>
                    </div>
                </div>
            </div>
            {allYears.length > 1 && (
                <div className="mb-4 px-4 m-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                    <select className="border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-medium focus:border-blue-500 focus:outline-none transition-colors" value={selectedYear} onChange={changeHandler}>
                        {allYears.map((year) => (
                            <option key={year} value={year} className="font-medium">
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="relative px-4 pb-4">
                <div className="grid grid-cols-4 gap-6">
                    {monthGroups.map((monthGroup) => (
                        <div key={`${monthGroup.year}-${monthGroup.month}`}>
                            <div className="text-xs font-semibold text-gray-600 text-center mb-2 uppercase tracking-wider" style={{ minWidth: `${monthGroup.weeks.length * 16}px` }}>
                                {monthGroup.label}
                            </div>
                            <div className="flex gap-[2px]">
                                {monthGroup.weeks.map((week, weekIndex) => (
                                    <div key={`${monthGroup.year}-${monthGroup.month}-${weekIndex}`} className="flex flex-col gap-[2px]">
                                        {week.map((date, dayIndex) => {
                                            if(!date) return <div key={`empty-${dayIndex}`} className="w-3 h-3" />
                                            const count = getSubmissionCount(date)
                                            return (
                                                <ToolTip key={date.toISOString()} placement="top" title={tooltipContent(date, count)}>
                                                    <div className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-black hover:ring-opacity-50 ${getIntensity(count)}`} />
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
    )
}

export default SubmissionCalendar
