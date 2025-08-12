export interface CodeForcesProfileInterface {
    username: string
    currRank: string
    maxRank: string
}

export interface CodeForcesContestInterface {
    totalContestAttended: number
    currRating: number
    maxRating: number
    contestId: number
    contestName: string
    contestRank: string
    contestRating: number
}

export interface CodeForcesErrorInterface {
    profile?: string
    contest?: string
    calendar?: string
}

export interface CodeForcesCalendarInterface {
    calendar: string
    streak: number,
    totalActiveDays: number
    activeYears: number[]
}

export interface CodeForcesProfileProps {
    profile: CodeForcesProfileInterface
}