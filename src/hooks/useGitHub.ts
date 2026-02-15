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