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