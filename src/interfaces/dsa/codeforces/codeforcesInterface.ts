export interface CodeForcesProfileInterface {
    username: string
    currRank: string
    maxRank: string
}

export interface CodeForcesContestInterface {
    totalContestAttended: number
    currRating: number
    maxRating: number
    contestHistory: CodeForcesContestHistoryInterface[]
}

export interface CodeForcesErrorInterface {
    profile?: string
    contest?: string
    problemBreakdown?: string
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

export interface ContestStatsProps {
    contest: CodeForcesContestInterface
}

export interface CodeForcesContestHistoryInterface {
    contestId: number
    contestName: string
    contestRank: string
    contestRating: number
    contestTime: number
}

export interface ProblemBreakdownInterface {
    rating: number
    count: number
    percentage: number
}

export interface CodeForcesProblemBreakdownProps {
    problemBreakdown: ProblemBreakdownInterface[]
}

export interface CodeForcesDataInterface {
    profileResponse: CodeForcesProfileInterface | null
    contestResponse: CodeForcesContestInterface | null
    problemBreakdownResponse: ProblemBreakdownInterface[] | null
    errors: CodeForcesErrorInterface
}