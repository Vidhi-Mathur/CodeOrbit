"use client"
import { type GithubErrorInterface, type GitHubCalendarInterface, type GitHubProfileInterface, type GitHubRepoInterface } from "@/interfaces/dev/github/githubInterface"
import axios from "axios"
import { useState } from "react"

export const useGitHub = (githubUsername: string) => {
    const [githubProfile, setGithubProfile] = useState<GitHubProfileInterface | null>(null)
    const [repos, setRepos] = useState<GitHubRepoInterface[]>([])
    const [calendar, setCalendar] = useState<GitHubCalendarInterface | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<GithubErrorInterface>({})
    const fetchGitHubData = async() => {
        setLoading(true)
        setCalendar(null)
        setGithubProfile(null)
        setRepos([])
        setErrors({})
        try {
            const response =  await axios.get(`/api/dev/github/${githubUsername}`)
            const { profileResponse, reposResponse, calendarResponse, errors } = response.data
            setCalendar(calendarResponse)
            setGithubProfile(profileResponse)
            setRepos(reposResponse)
            setErrors(errors || {})  
        } 
        catch(err: any){
            setErrors({
                profile: err?.response?.data?.error || "Failed to load GitHub profile",
                calendar: err?.response?.data?.error || "Failed to load Github contribution calendar"
            })
        } 
        finally{
            setLoading(false)
        }
    }
    return { githubProfile, repos, calendar, loading, errors, fetchGitHubData }
}