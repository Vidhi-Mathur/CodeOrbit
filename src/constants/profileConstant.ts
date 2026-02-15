import type { Profile } from "@/interfaces/authInterface"

export const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const infoLinks: string[] = ["email", "linkedin", "twitter", "website"] as const 
export type InfoLink = typeof infoLinks[number]

export const DSA_LINKS = {
    LEETCODE: "leetcode",
    CODEFORCES: "codeforces",
    CODECHEF: "codechef",
    GEEKSFORGEEKS: "geeksforgeeks",
    HACKERRANK: "hackerrank",
    INTERVIEWBIT: "interviewbit",
    CODINGNINJAS: "codingninjas"
} as const
export type DsaLink = typeof DSA_LINKS[keyof typeof DSA_LINKS];

export const DEV_LINKS = {
    GITHUB: "github"
} as const
export type DevLink = typeof DEV_LINKS[keyof typeof DEV_LINKS]

export const PROFILE_TABS = {
    PROBLEM_SOLVING: "problemsolving",
    DEVELOPMENT: "development"
} as const;
export type ProfileTabs = typeof PROFILE_TABS[keyof typeof PROFILE_TABS];

export const profileConstants: readonly Profile[] = [
    {
        label: "Problem Solving",
        image: PROFILE_TABS.PROBLEM_SOLVING
    },
    {
        label: "Development", 
        image: PROFILE_TABS.DEVELOPMENT
    }
] as const;