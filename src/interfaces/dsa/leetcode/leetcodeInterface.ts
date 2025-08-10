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
  calendarMap: Record<number, LeetcodeCalendarInterface>
}

export interface LeetcodeCalendarInterface {
    submissionCalendar: string
    streak: number,
    totalActiveDays: number
    activeYears: number[]
}

export interface LeetcodeContestInterface {
    totalContestAttended: number
    globalRanking: number
    rating: number
    topPercentage: number
    totalParticipants: number
}

export interface ContestStatsProps {
    contest: LeetcodeContestInterface
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