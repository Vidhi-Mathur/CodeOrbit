import crypto from "crypto";

export const buildAIProfile = ({ user }: any) => {
    return {
        basicInfo: {
            name: user.name,
            username: user.username,
        },
        education: user.education,
        platforms: user.platforms
    }
}


export const generateProfileHash = (profile: any) => {
    return crypto.createHash("sha256").update(JSON.stringify(profile)).digest("hex");
}