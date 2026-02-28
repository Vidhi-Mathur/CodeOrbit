import { LeetCodeCalendarInterface } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useLeetcodeQuery = (leetcode_username: string | undefined) => {
    return useQuery({
        queryKey: ["leetcode", leetcode_username],
        queryFn: async () => {
            const response =  await axios.get(`/api/dsa/leetcode/${leetcode_username}`)
            return response.data
        },
        enabled: !!leetcode_username,
    })
}

export const useLeetcodeCalendarQuery = (leetcode_username: string | undefined, year: number, calendarMap: Record<number, LeetCodeCalendarInterface>) => {
    return useQuery({
        queryKey: ["leetcode-calendar", leetcode_username, year],    
        queryFn: async () => {
            const response =  await axios.get(`/api/dsa/leetcode/${leetcode_username}/calendar?year=${year}`)
            return response.data
        },
        enabled: !!leetcode_username && !calendarMap[year]
    })
}