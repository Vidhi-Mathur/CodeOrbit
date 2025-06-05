import { NextRequest } from 'next/server';
import axios from 'axios';
import type { GitHubProfileInterface, GitHubRepoInterface } from '@/interfaces/dev/github/githubInterface';

const extractedRepos = (repo: any): GitHubRepoInterface => ({
    name: repo.name,
    html_url: repo.url,
    description: repo.description,
    homepage: repo.homepageUrl,
    created_at: repo.createdAt,
    language: repo.primaryLanguage?.name || null,
    topics: repo.repositoryTopics?.nodes?.map((node: any) => node.topic.name) || [],
})

const query = 
        `query getGitHubProfile($github_username: String!) {
            user(login: $github_username) {
                name
                login
                bio
                company
                location
                createdAt
                followers {
                    totalCount
                }
                repositoriesCount: repositories(privacy: PUBLIC) {
                    totalCount
                }
                pinnedItems(first: 6, types: REPOSITORY) {
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
                recentRepositories: repositories(
                    first: 6
                    orderBy: { field: UPDATED_AT, direction: DESC }
                    privacy: PUBLIC
                    affiliations: OWNER
                ) {
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
        }`
    ;

export async function GET(req: NextRequest, { params }: { params: Promise<{ github_username: string }> }) {
    const { github_username } = await params;

    if (!github_username){
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    try {
        const response = await axios.post('https://api.github.com/graphql', { query, variables: { github_username } }, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_AUTH_KEY!}`,
            }, }
        )
        const user = response.data?.data?.user;
        if(!user){
            return new Response(JSON.stringify({ error: "GitHub User not found" }), { status: 404 });
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

        const reposMap = new Map<string, GitHubRepoInterface>();
        pinnedRepos.forEach((repo: any) => (
            reposMap.set(repo.name, repo)
        ))
        
        for(let repo of recentRepos){
            if(reposMap.size >= 6) break;
            //Avoid duplicates
            if(!reposMap.has(repo.name)) reposMap.set(repo.name, repo)
        }

        const reposResponse = Array.from(reposMap.values()).slice(0, 6)

        return new Response(JSON.stringify({ profileResponse, reposResponse }), { status: 200 })

    } 
    catch (err: any){
        return new Response(JSON.stringify({ error: "Failed to fetch GitHub data" }), { status: 500 })
    }
}