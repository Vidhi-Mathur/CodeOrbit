import type { Profile } from "@/interfaces/authInterface"

export const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const infoLinks: string[] = ["email", "linkedin", "twitter", "website"] as const 
export type InfoLink = typeof infoLinks[number]

export const cpLinks: string[] = ["leetcode", "geeksforgeeks", "codeforces", "codechef", "hackerrank", "interviewbit", "codingninjas"] as const 
export type CpLink = typeof cpLinks[number];

export const devLinks: string[] = ["github"] as const 
export type DevLink = typeof devLinks[number]

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