import type { Profile } from "@/interfaces/authInterface"

export const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const infoLinks: string[] = ["email", "linkedin", "twitter", "website"] as const 
export type InfoLink = typeof infoLinks[number]

export const cpLinks: string[] = ["leetcode", "geeksforgeeks", "codeforces", "codechef", "hackerrank", "interviewbit", "codingninjas"] as const 
export type CpLink = typeof cpLinks[number];

export const devLinks: string[] = ["github"] as const 
export type DevLink = typeof devLinks[number]

export const profileConstants: Profile[] = [{
    label: "Problem Solving",
    image: "problemsolving"
    }, {
    label: "Development",
    image: "development"
    }
]