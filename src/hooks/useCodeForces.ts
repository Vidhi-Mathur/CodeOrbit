import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useCodeforcesQuery = (codeforces_username: string | undefined) => {
    return useQuery({
        queryKey: ["codeforces", codeforces_username],
        queryFn: async () => {
            const response =  await axios.get(`/api/dsa/codeforces/${codeforces_username}`)
            return response.data
        },
        enabled: !!codeforces_username,
    })
}