import axios from 'axios'
import type { GitHubDataInterface, GithubErrorInterface, GitHubProfileInterface, GitHubRepoInterface } from '@/interfaces/dev/github/githubInterface'
import { unstable_cache } from 'next/cache'
import { getCachedGithubCalendar } from '@/lib/services/dev/calendar'

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

    const createdYear = new Date(user.createdAt).getFullYear()
    const currentYear = new Date().getFullYear()

    const activeYears: number[] = []
    for(let y = currentYear; y >= createdYear && activeYears.length < 5; y--) {
        activeYears.push(y)
    }

    const { calendarResponse: currentCalendar, error: calendarError } = await getCachedGithubCalendar(github_username, currentYear)();
    
    const calendarResponse = {
        activeYears,
        contributionCalendarResponse: currentCalendar.contributionCalendarResponse
    }

    errors.calendar = calendarError

    return { profileResponse, reposResponse, calendarResponse, errors }
}

export const verifyGithub = async(github_username: string) => {
    const verificationResponse = await axios.post('https://api.github.com/graphql', { 
        query: verifyQuery, 
        variables: { 
            github_username 
        }
    }, { headers })
    return !!verificationResponse.data?.data?.user;
}

export const getCachedGithubData = (github_username: string) => unstable_cache(() => 
    fetchGitHubData(github_username), [`github-${github_username}`], {
        revalidate:  3600,
        tags: [`github-${github_username}`]
    }
)