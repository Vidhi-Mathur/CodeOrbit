import { ProfileComponentProps } from "@/interfaces/profileInterfaces";
import { ai } from "./gemini";
import { buildProfileReviewPrompt } from "./prompt";

const extractJson = (text: string) => {
    const cleaned = text.match(/\{[\s\S]*\}/)
    if(!cleaned) {
        throw new Error("No valid JSON found in Gemini response");
    }
    return JSON.parse(cleaned[0]);
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateProfileReview = async(profile: ProfileComponentProps["user"]) => {
    const prompt = buildProfileReviewPrompt(profile);
    //Retry up to 3 times for temporary 503 errors
    for(let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            const text = response.text ?? "";
            if(!text){
                throw new Error("Gemini returned an empty response.");
            }
            return extractJson(text);
        } 
        catch(error: any){
            const status = error?.status;
            //Retry only for temporary service-unavailable errors
            if(status === 503 && attempt < 3){
                await sleep(1000 * attempt);
                continue;
            }
            throw error;
        }
    }
    throw new Error("Failed to generate profile review.");
}