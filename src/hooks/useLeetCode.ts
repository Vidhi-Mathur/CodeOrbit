"use client"
import { LeetcodeContestInterface, LeetCodeProfileInterface } from "@/interfaces/profileInterfaces"
import axios from "axios"
import { useState } from "react"

export const useLeetCode = (leetcodeUsername: string) => {
    const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfileInterface | null>(null)
    const [contest, setContest] = useState<LeetcodeContestInterface>();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const fetchLeetCodeData = async() => {
        setLoading(true)
        setError(null)
        try {
            const response =  await axios.get(`/api/dsa/leetcode/${leetcodeUsername}`)
            const { profileResponse, contestResponse } = response.data
            setLeetcodeProfile(profileResponse)
            setContest(contestResponse)
        } 
        catch(err: any){
            console.error("API call failed", err)
            let message = err.response?.data?.error || "Failed to load LeetCode profile"
            setError(message)
        } 
        finally{
            setLoading(false)
        }
    }
    return { leetcodeProfile, contest, loading, error, fetchLeetCodeData }
}