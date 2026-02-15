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