import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import type { GitHubCalendarInterface } from '@/interfaces/dev/github/githubInterface'
import { unstable_cache } from 'next/cache'

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

const token = process.env.GITHUB_AUTH_KEY!
const headers = { Authorization: `Bearer ${token}` }

const fetchGitHubCalendar = async(github_username: string, year: number): Promise<{ calendarResponse: GitHubCalendarInterface, error?: string }> => {
    const now = new Date()
    const from = `${year}-01-01T00:00:00Z`
    //only up to today if current year
    const to = year === now.getFullYear()? now.toISOString(): `${year}-12-31T23:59:59Z`
    const response = await axios.post('https://api.github.com/graphql', { 
        query: calendarQuery, 
        variables: { 
            github_username, 
            from, 
            to
        }
    }, { headers })
    const calendarMap: Record<number, { totalContributions: number, weeks: any[] }> = {}
    const calendar = response.data?.data?.user?.contributionsCollection?.contributionCalendar
    if(!calendar){
        return { 
            calendarResponse: { 
                activeYears: [], 
                contributionCalendarResponse: {} 
            }, 
            error: "Calendar not found" 
        }
    }
    calendarMap[year] = {
        totalContributions: calendar?.totalContributions || 0,
        weeks: calendar?.weeks || []
    }
    return {
        calendarResponse: {
            activeYears: [year],
            contributionCalendarResponse: calendarMap,
        }
    }
}

const getCachedGithubCalendar = (github_username: string, year: number) => unstable_cache(() => 
    fetchGitHubCalendar(github_username, year), [`github-calendar-${github_username}-${year}`], {
        revalidate:  3600,
        tags: [`github-calendar-${github_username}-${year}`]
    }
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ github_username: string }> }) {
    const { github_username } = await params    
    if(!github_username){
        return NextResponse.json({ error: "Github Username is required" }, { status: 400 })
    }

    const year = Number(req.nextUrl.searchParams.get('year'))
    if(!year){
        return NextResponse.json({ error: "Year is required" }, { status: 400 })
    }

    try {
        const { calendarResponse, error } = await getCachedGithubCalendar(github_username, year)()
        if(error){
            return NextResponse.json({ error }, { status: 404 })
        }
        return NextResponse.json({ calendarResponse }, { status: 200 })
    } 
    catch(err: any){
        if(err.code === 404){
            return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
    }
}