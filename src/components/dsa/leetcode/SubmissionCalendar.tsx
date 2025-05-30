"use client"
import type { LeetcodeCalendarInterface } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import { formatDate } from "@/lib/helper"
import { useMemo, useState } from "react"
import { ToolTip } from "../../ui/ToolTip"

const today = new Date()

//Get the current date and calculate the start date (here is 1st Jan), and generate all dates for the year
const generateDates = (year: number) => {
    const dates = []
    const start = new Date(year, 0, 1) 
    const end = new Date(year === today.getFullYear() ? today : new Date(year, 11, 31)) 
    const current = new Date(start)
    while(current <= end){
        dates.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }
    return dates
}

//Get color intensity based on submission count
const getIntensity = (count: number) => {
    if(count === 0) return "bg-gray-100 border-gray-200"
    if(count <= 2) return "bg-green-200 border-green-300"
    if(count <= 5) return "bg-green-400 border-green-500"
    if(count <= 10) return "bg-green-600 border-green-700"
    return "bg-green-800 border-green-900"
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

let tooltipContent = (date: Date, count: number) => {
    return (
        <div>
            <div className="font-medium">
                {count} submission{count !== 1 ? "s" : ""}
            </div>
            <div className="text-gray-300 text-xs">
                {formatDate(date.toISOString())}
            </div>
        </div>
    )
}

const SubmissionCalendar = (props: LeetcodeCalendarInterface) => {
    const { submissionCalendar, streak, totalActiveDays, activeYears } = props;

    //To select year 
    const [selectedYear, setSelectedYear] = useState<number>(activeYears?.[0] || today.getFullYear())

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

    //Group dates by month, then organize into weeks within each month
    const groupDatesByMonth = () => {
        const monthGroups: {
            month: number
            year: number
            label: string
            weeks: (Date | null)[][]
        }[] = []

        //Group dates by month-year
        const datesByMonth: { [key: string]: Date[] } = {}

        //Iterate through all dates and group them by month
        dates.forEach((date) => {
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`
            if(!datesByMonth[monthKey]){
                datesByMonth[monthKey] = []
            }
            datesByMonth[monthKey].push(date)
        })

        //Convert each month's dates into week structure
        Object.keys(datesByMonth).sort().forEach((monthKey) => {
            const [year, month] = monthKey.split("-").map(Number)
            const monthDates = datesByMonth[monthKey]

            if (monthDates.length === 0) return

            //Create weeks for this month
            const weeks: (Date | null)[][] = []
            let currentWeek: (Date | null)[] = []

            //Find the first date and determine what day of week it starts on
            const firstDate = monthDates[0]
            //0 = Sunday, 1 = Monday, etc.
            const startDayOfWeek = firstDate.getDay() 

            //Fill in empty slots at the beginning of the first week if needed
            for(let i = 0; i < startDayOfWeek; i++){
                currentWeek.push(null)
            }

            //Add all dates for this month
            monthDates.forEach((date) => {
                currentWeek.push(date)
                //Filled a week, start new
                if(currentWeek.length === 7){
                    weeks.push([...currentWeek])
                    currentWeek = []
                }
            })

            //Fill the last week with nulls if needed
            while(currentWeek.length > 0 && currentWeek.length < 7){
                currentWeek.push(null)
            }

            //If there are any remaining days in the current week, add it to weeks
            if(currentWeek.length > 0){
                weeks.push(currentWeek)
            }
            //Add this month group
            monthGroups.push({ month, year, label: months[month], weeks })
        })
    return monthGroups
    }

    //Group dates by month and weeks
    const monthGroups = useMemo(() => groupDatesByMonth(), [dates])

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
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 px-4">
                    <div>
                        <span className="font-medium text-gray-800">{totalSubmissions}</span>
                        <div>Total submissions</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-800">{totalActiveDays}</span>
                        <div>Total Active Days</div>
                    </div>
                    <div>
                        <span className="font-medium text-gray-800">{streak}</span>
                        <div>Longest streak</div>
                    </div>
                </div>
            </div>
           {activeYears.length > 1 && (
                <div className="mb-4 px-4">
                    <label className="block text-sm text-gray-600 mb-1">Year</label>
                    <select className="border rounded px-2 py-1 text-black"  value={selectedYear} onChange={changeHandler}>
                        {activeYears.map((year) => (
                            <option key={year} value={year}>
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
                            <div className="text-xs text-gray-500 text-center mb-1" style={{ minWidth: `${monthGroup.weeks.length * 16}px` }}>
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
