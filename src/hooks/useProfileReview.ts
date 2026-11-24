import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useProfileReviewQuery = (username: string | undefined) => {
    const queryClient = useQueryClient()
    const query = useQuery({
        queryKey: ["profile-review", username],
        queryFn: async () => {
            const response = await axios.post(`/api/profile/review`);
            return response.data;
        },
        enabled: !!username,
        staleTime: Infinity
    });
    const regenerateReview = async() => {
        const response = await axios.post(`/api/profile/review`, { 
            username,
            forceRefresh: true
        });
        //Update
        queryClient.setQueryData(["profile-review", username], response.data)
        return response.data;
    }
    return {
        ...query,
        regenerateReview
    }
};

