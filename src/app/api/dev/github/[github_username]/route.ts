import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { GitHubDataInterface, GithubErrorInterface, GitHubProfileInterface, GitHubRepoInterface } from '@/interfaces/dev/github/githubInterface'
import { unstable_cache } from 'next/cache'

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

const verifyQuery = `
    query verifyUser($github_username: String!){
        user(login: $github_username) {
            login
        }
    }
`

const token = process.env.GITHUB_AUTH_KEY!
const headers = { Authorization: `Bearer ${token}` }

const fetchGitHubData = async(github_username: string): Promise<GitHubDataInterface> => {
    //Fetch profile and repos
    const profileRes = await axios.post('https://api.github.com/graphql', { 
        query: profileQuery, 
        variables: { 
            github_username 
        }
    }, { headers })
    const user = profileRes.data?.data?.user
    
    if(!user){
        const error: any = new Error("GitHub user not found")
        error.code = 404
        throw error
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
    let errors: GithubErrorInterface = {
        profile: undefined,
        calendar: undefined
    }
    
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
    const calendarResults = await Promise.allSettled(calendarPromises)
    const calendarMap: Record<number, { totalContributions: number, weeks: any[] }> = {}
    calendarResults.forEach((res, index) => {
        if(res.status === 'fulfilled'){
            const year = activeYears[index]
            const cal = res.value.data?.data?.user?.contributionsCollection?.contributionCalendar
            calendarMap[year] = {
                totalContributions: cal?.totalContributions || 0,
                weeks: cal?.weeks || []
            }
        }
        else errors.calendar = res.reason?.message || `Failed to fetch calendar for ${activeYears[index]}`
    })
    const calendarResponse = {
        activeYears: [...activeYears].sort((a, b) => a - b),
        contributionCalendarResponse: calendarMap,
    }
    return { profileResponse, reposResponse, calendarResponse, errors }
}

const verifyGithub = async(github_username: string) => {
    const verificationResponse = await axios.post('https://api.github.com/graphql', { 
        query: verifyQuery, 
        variables: { 
            github_username 
        }
    }, { headers })
    return !!verificationResponse.data?.data?.user;
}

const getCachedGithubData = (github_username: string) => unstable_cache(() => 
    fetchGitHubData(github_username), [`github-${github_username}`], {
        revalidate:  3600,
        tags: [`github-${github_username}`]
    }
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ github_username: string }> }) {
    const { github_username } = await params

    if(!github_username){
        return NextResponse.json({ error: "Github Username is required" }, { status: 400 })
    }

    try {
        const verifyMode = req.nextUrl.searchParams.get("verify") === "true"
        if(verifyMode){
            const isValid = await verifyGithub(github_username)
            if(!isValid){
                return NextResponse.json({ valid: false, message: "GitHub user not found" }, { status: 404 })
            }
            return NextResponse.json({ valid: true }, { status: 200 });
        }
        //() as unstable_cache returns function, so call it first to get data
        const { profileResponse, reposResponse, calendarResponse, errors } = await getCachedGithubData(github_username)()
        return NextResponse.json({ profileResponse, reposResponse, calendarResponse, errors }, { status: 200 })
    } 
    catch(err: any){
        if(err.code === 404){
            return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
    }
}