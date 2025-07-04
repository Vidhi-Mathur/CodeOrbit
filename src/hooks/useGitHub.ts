"use client"
import type { GitHubProfileInterface, GitHubRepoInterface } from "@/interfaces/dev/github/githubInterface"
import axios from "axios"
import { useState } from "react"

export const useGitHub = (githubUsername: string) => {
    const [githubProfile, setGithubProfile] = useState<GitHubProfileInterface | null>(null)
    const [repos, setRepos] = useState<GitHubRepoInterface[]>([])
    const [calendar, setCalendar] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const fetchGitHubData = async() => {
        setLoading(true)
        setError(null)
        try {
            const response =  await axios.get(`/api/dev/github/${githubUsername}`)
            const { profileResponse, reposResponse, calendarResponse } = response.data
            console.log(calendarResponse)
            setCalendar(calendarResponse)
            setGithubProfile(profileResponse)
            setRepos(reposResponse)
        } 
        catch(err: any){
            console.error("API call failed", err)
            let message = err.response?.data?.error || "Failed to load GitHub profile"
            setError(message)
        } 
        finally{
            setLoading(false)
        }
    }
    return { githubProfile, repos, calendar, loading, error, fetchGitHubData  }
}