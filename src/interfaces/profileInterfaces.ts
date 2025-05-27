export interface GitHubProfileInterface {
    name: string
    login: string
    bio: string | null
    publicRepos: number | 0
    followers: number | 0
    createdAt: string
    location: string | null
    company: string | null
}

export interface GitHubRepoInterface {
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    created_at: string
    language: string
    topics: string[]
}

export interface GitHubProfileProps {
    profile: GitHubProfileInterface
}

export interface GitHubActivityProps {
    username: string
}

export interface LeetCodeProfileInterface {
    username: string
    realName: string
    aboutMe: string | null
    ranking: number
    reputation: number,
    skillTags: string[],
    badges: LeetCodeBadge[],
    submissionStats: LeetCodeSubmissionStat[],
    languageStats: LeetCodeLanguageStat[],
    submissionCalendar: Record<string, string>
}

export interface LeetCodeProfileProps {
    profile: LeetCodeProfileInterface
}


interface LeetCodeBadge {
    id: string;
    name: string;
    icon: string;
}

interface LeetCodeSubmissionStat {
    difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
    count: number;
    submissions: number;
}

interface LeetCodeLanguageStat {
    languageName: string;
    problemsSolved: number;
}

export interface LeetcodeContestInterface {
    totalContestAttended: number
    globalRanking: number
    rating: number
    topPercentage: number
    totalParticipants: number
}

export interface CurvedNavProps {
    activeTab: string;
    setActiveTab: (value: string) => void;
}