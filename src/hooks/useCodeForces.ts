"use client"
import type { CodeForcesCalendarInterface, CodeForcesContestInterface, CodeForcesErrorInterface, CodeForcesProfileInterface } from "@/interfaces/dsa/codeforces/codeforcesInterface"
import axios from "axios"
import { useState } from "react"

export const useCodeForces = (codeforcesUsername: string) => {
    const [profile, setProfile] = useState<CodeForcesProfileInterface | null>(null)
    // const [contest, setContest] = useState<CodeForcesContestInterface | null>(null);
    // const [calendar, setCalendar] = useState<CodeForcesCalendarInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<CodeForcesErrorInterface>({});
    const fetchCodeForcesData = async() => {
        setLoading(true)
        try {
            const response =  await axios.get(`/api/dsa/codeforces/${codeforcesUsername}`)
            const { profileResponse, errors } = response.data
            setProfile(profileResponse)
            // setContest(contestResponse)
            // setCalendar(submissionCalendarResponse)
            setErrors(errors || {});
        } 
        catch(err: any){
            setErrors({
                profile: "Failed to load profile",
                // contest: "Failed to load contest",
                // calendar: "Failed to load calendar"
            }); 
        } 
        finally{
            setLoading(false)
        }
    }
    return { profile, loading, errors, fetchCodeForcesData }
}