"use client"
import type { LeetCodeCalendarInterface, LeetCodeContestInterface, LeetCodeErrorInterface, LeetCodeProfileInterface } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import axios from "axios"
import { useState } from "react"

export const useLeetCode = (leetcodeUsername: string) => {
    const [profile, setProfile] = useState<LeetCodeProfileInterface | null>(null)
    const [contest, setContest] = useState<LeetCodeContestInterface | null>(null);
    const [calendar, setCalendar] = useState<LeetCodeCalendarInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<LeetCodeErrorInterface>({});
    const fetchLeetCodeData = async() => {
        setLoading(true)
        setErrors({})
        setProfile(null)
        setContest(null)
        setCalendar(null)
        try {
            const response =  await axios.get(`/api/dsa/leetcode/${leetcodeUsername}`)
            const { profileResponse, contestResponse, submissionCalendarResponse, errors } = response.data
            setProfile(profileResponse)
            setContest(contestResponse)
            setCalendar(submissionCalendarResponse)
            setErrors(errors || {});
        } 
        catch(err: any){
            setErrors({
                profile: "Failed to load profile",
                contest: "Failed to load contest",
                calendar: "Failed to load calendar"
            }); 
        } 
        finally{
            setLoading(false)
        }
    }
    return { profile, contest, calendar, loading, errors, fetchLeetCodeData }
}