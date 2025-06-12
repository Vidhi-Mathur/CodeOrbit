import { NextRequest } from 'next/server'
import axios from 'axios'
import type { GitHubProfileInterface, GitHubRepoInterface } from '@/interfaces/dev/github/githubInterface'

const extractedRepos = (repo: any): GitHubRepoInterface => ({
    name: repo.name,
    html_url: repo.url,
    description: repo.description,
    homepage: repo.homepageUrl,
    created_at: repo.createdAt,
    language: repo.primaryLanguage?.name || null,
    topics: repo.repositoryTopics?.nodes?.map((node: any) => node.topic.name) || [],
})

const profileQuery = `
    query getGitHubProfile($github_username: String!){
        user(login: $github_username){
            name
            login
            bio
            company
            location
            createdAt
            followers {
              totalCount
            }
            repositoriesCount: repositories(privacy: PUBLIC){
              totalCount
            }
            pinnedItems(first: 6, types: REPOSITORY){
                nodes {
                    ... on Repository {
                        name
                        description
                        url
                        homepageUrl
                        createdAt
                        primaryLanguage {
                            name
                        }
                        repositoryTopics(first: 10) {
                            nodes {
                                topic {
                                    name
                                }
                            }
                        }
                    }
                }
            }
            recentRepositories: repositories(first: 6, orderBy: { 
                field: UPDATED_AT, 
                direction: DESC 
                },
                privacy: PUBLIC,
                affiliations: OWNER){
                    nodes {
                    name
                    description
                    url
                    homepageUrl
                    createdAt
                    primaryLanguage {
                        name
                    }
                    repositoryTopics(first: 10) {
                        nodes {
                            topic {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`

const calendarQuery = `
    query getYearlyContributions($github_username: String!, $from: DateTime!, $to: DateTime!){
        user(login: $github_username){
            contributionsCollection(from: $from, to: $to){
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                            color
                            weekday
                        }
                    }
                }
            }
        }
    }
`

export async function GET(req: NextRequest, { params }: { params: Promise<{ github_username: string }> }) {
    const { github_username } = await params

    if(!github_username){
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 })
    }

    try {
        const token = process.env.GITHUB_AUTH_KEY!
        const headers = { Authorization: `Bearer ${token}` }

        //Fetch profile and repos
        const profileRes = await axios.post('https://api.github.com/graphql', { query: profileQuery, variables: { github_username }}, { headers })

        const user = profileRes.data?.data?.user
        
        if(!user){
            return new Response(JSON.stringify({ error: "GitHub User not found" }), { status: 404 })
        }

        const profileResponse: GitHubProfileInterface = {
            name: user.name,
            login: user.login,
            bio: user.bio,
            location: user.location,
            company: user.company,
            createdAt: user.createdAt,
            followers: user.followers?.totalCount,
            publicRepos: user.repositoriesCount?.totalCount
        }

        let pinnedRepos: GitHubRepoInterface[] = (user.pinnedItems?.nodes || []).map(extractedRepos)
        let recentRepos: GitHubRepoInterface[] = (user.recentRepositories?.nodes || []).map(extractedRepos)

        const reposMap = new Map<string, GitHubRepoInterface>()
        pinnedRepos.forEach((repo: any) => (
            reposMap.set(repo.name, repo)
        ))

        for(let repo of recentRepos){
            if(reposMap.size >= 6) break
            //Avoid duplicates
            if(!reposMap.has(repo.name)) reposMap.set(repo.name, repo)
        }

        const reposResponse = Array.from(reposMap.values()).slice(0, 6)

        //Determine active years (based on createdAt)
        const createdYear = new Date(user.createdAt).getFullYear()
        const currentYear = new Date().getFullYear()
        const activeYears: number[] = []
        for(let y = currentYear; y >= createdYear && activeYears.length < 5; y--){
            activeYears.push(y)
        }

        //Fetch contribution calendars per year
        const calendarPromises = activeYears.map((year) => {
            const now = new Date()
            const from = `${year}-01-01T00:00:00Z`
            //only up to today if current year
            const to = year === now.getFullYear()? now.toISOString(): `${year}-12-31T23:59:59Z`
            return axios.post('https://api.github.com/graphql', { query: calendarQuery, variables: { github_username, from, to}}, { headers })})

        const calendarResults = await Promise.all(calendarPromises)

        const calendarMap: Record<number, { totalContributions: number, weeks: any[] }> = {}

        calendarResults.forEach((res, index) => {
            const year = activeYears[index]
            const cal = res.data?.data?.user?.contributionsCollection?.contributionCalendar
            calendarMap[year] = {
                totalContributions: cal?.totalContributions || 0,
                weeks: cal?.weeks || []
            }
        })

        const calendarResponse = {
            activeYears: [...activeYears].sort((a, b) => a - b),
            contributionCalendarResponse: calendarMap,
        }

        return new Response(JSON.stringify({ profileResponse, reposResponse, calendarResponse }), { status: 200 })
    } 
    catch(err: any){
        console.error("GitHub API Error:", err.message)
        return new Response(JSON.stringify({ error: "Failed to fetch GitHub data" }), { status: 500 })
    }
}