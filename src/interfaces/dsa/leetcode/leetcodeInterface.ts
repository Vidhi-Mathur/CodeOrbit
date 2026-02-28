export interface LeetCodeProfileInterface {
    username: string
    realName: string
    aboutMe: string | null
    ranking: number
    reputation: number
    skillTags: string[]
    badges: LeetCodeBadge[]
    submissionStats: LeetCodeSubmissionStat[]
    languageStats: LeetCodeLanguageStat[]
}

export interface LeetCodeProfileProps {
    profile: LeetCodeProfileInterface
}

export interface SubmissionCalendarProps {
  calendarMap: Record<number, LeetCodeCalendarInterface>,
  username: string
}

export interface LeetCodeCalendarInterface {
    submissionCalendar: string
    streak: number,
    totalActiveDays: number
    activeYears: number[]
}

export interface LeetCodeContestInterface {
    totalContestAttended: number
    globalRanking: number
    rating: number
    topPercentage: number
    totalParticipants: number
}

export interface ContestStatsProps {
    contest: LeetCodeContestInterface
}

export interface LeetCodeErrorInterface {
    profile?: string
    contest?: string
    calendar?: string
}

interface LeetCodeBadge {
    id: string
    name: string
    icon: string
}

interface LeetCodeSubmissionStat {
    difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
    count: number
    submissions: number
}

interface LeetCodeLanguageStat {
    languageName: string
    problemsSolved: number
} 

export interface LeetCodeDataInterface {
    profileResponse: LeetCodeProfileInterface | null
    contestResponse: LeetCodeContestInterface | null
    submissionCalendarResponse: Record<number, LeetCodeCalendarInterface | null>
    errors: LeetCodeErrorInterface
}