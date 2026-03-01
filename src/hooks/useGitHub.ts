import { GitHubCalendarInterface } from "@/interfaces/dev/github/githubInterface"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGithubQuery = (github_username: string | undefined) => {
    return useQuery({
        queryKey: ["github", github_username],
        queryFn: async () => {
            const response =  await axios.get(`/api/dev/github/${github_username}`)
            return response.data
        },
        enabled: !!github_username,
    })
}

export const useGithubCalendarQuery = (github_username: string | undefined, year: number, existingCalendar: GitHubCalendarInterface |undefined) => {
    return useQuery({
        queryKey: ["github-calendar", github_username, year],
        queryFn: async () => {
              const response = await axios.get(`/api/dev/github/${github_username}/calendar?year=${year}`)
              return response.data
        },
        enabled: !!github_username && !!year && !existingCalendar?.contributionCalendarResponse?.[year],
    })
}