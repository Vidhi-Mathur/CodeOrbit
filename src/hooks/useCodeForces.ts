"use client"
import { type ProblemBreakdownInterface, type CodeForcesContestInterface, type CodeForcesErrorInterface, type CodeForcesProfileInterface } from "@/interfaces/dsa/codeforces/codeforcesInterface"
import axios from "axios"
import { useState } from "react"

export const useCodeForces = (codeforcesUsername: string) => {
    const [profile, setProfile] = useState<CodeForcesProfileInterface | null>(null)
    const [contest, setContest] = useState<CodeForcesContestInterface | null>(null);
    const [problemBreakdown, setProblemBreakdown] = useState<ProblemBreakdownInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<CodeForcesErrorInterface>({});
    const fetchCodeForcesData = async() => {
        setLoading(true)
        setErrors({}) 
        setProfile(null)
        setContest(null)
        setProblemBreakdown([])
        try {
            const response =  await axios.get(`/api/dsa/codeforces/${codeforcesUsername}`)
            const { profileResponse, contestResponse, problemBreakdownResponse, errors } = response.data
            setProfile(profileResponse)
            setContest(contestResponse)
            setProblemBreakdown(problemBreakdownResponse)
            setErrors(errors || {});
        } 
        catch(err: any){
            setErrors({
                profile: "Failed to load profile",
                contest: "Failed to load contest",
                problemBreakdown: "Failed to load problem"
            }); 
        } 
        finally{
            setLoading(false)
        }
    }
    return { profile, contest, problemBreakdown, loading, errors, fetchCodeForcesData }
}