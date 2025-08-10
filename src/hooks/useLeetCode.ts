"use client"
import type { LeetcodeCalendarInterface, LeetcodeContestInterface, LeetCodeErrorInterface, LeetCodeProfileInterface } from "@/interfaces/dsa/leetcode/leetcodeInterface"
import axios from "axios"
import { useState } from "react"

export const useLeetCode = (leetcodeUsername: string) => {
    const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfileInterface | null>(null)
    const [contest, setContest] = useState<LeetcodeContestInterface>();
    const [submissionCalendar, setSubmissionCalendar] = useState<LeetcodeCalendarInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<LeetCodeErrorInterface>({});
    const fetchLeetCodeData = async() => {
        setLoading(true)
        try {
            const response =  await axios.get(`/api/dsa/leetcode/${leetcodeUsername}`)
            const { profileResponse, contestResponse, submissionCalendarResponse, errors } = response.data
            setLeetcodeProfile(profileResponse)
            setContest(contestResponse)
            setSubmissionCalendar(submissionCalendarResponse)
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
    return { leetcodeProfile, contest, submissionCalendar, loading, errors, fetchLeetCodeData }
}