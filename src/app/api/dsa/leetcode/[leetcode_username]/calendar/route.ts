import type { LeetCodeCalendarInterface } from '@/interfaces/dsa/leetcode/leetcodeInterface';
import axios from 'axios'
import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const calendarQuery = `
    query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
            userCalendar(year: $year) {
                activeYears
                streak
                totalActiveDays
                submissionCalendar
            }
        }
    }
`

const fetchLeetcodeCalendar = async(leetcode_username: string, year: number): Promise<{ submissionCalendarResponse: Record<number, LeetCodeCalendarInterface>, error?: string }> => {
    const headers = {
        'Content-Type': 'application/json',
        Referer: `https://leetcode.com/${leetcode_username}/`,
    }
 
    const response = await axios.post('https://leetcode.com/graphql', { 
        query: calendarQuery, 
        variables: { 
            username: leetcode_username, 
            year
        } 
    }, { headers })

    let calendar = response.data.data?.matchedUser?.userCalendar;
    if(!calendar){
        return {
            submissionCalendarResponse: {},
            error: 'Calendar not found'
        }
    } 
    return {
        submissionCalendarResponse: {
            [year]: {
                submissionCalendar: calendar.submissionCalendar || "{}",
                streak: calendar.streak || 0,
                totalActiveDays: calendar.totalActiveDays || 0,
                activeYears: calendar.activeYears || []
            }
        }
    }
}

const getCachedLeetcodeCalendar= (leetcode_username: string, year: number) => unstable_cache(() => 
    fetchLeetcodeCalendar(leetcode_username, year), [`leetcode-calendar-${leetcode_username}-${year}`], {
        revalidate: 3600,
        tags: [`leetcode-calendar-${leetcode_username}-${year}`]
    }
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ leetcode_username: string }> }) {
    const { leetcode_username } = await params;

    if(!leetcode_username){
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    const year = Number(req.nextUrl.searchParams.get('year'))

    if(!year){
        return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }

    try {
        const { submissionCalendarResponse, error } = await getCachedLeetcodeCalendar(leetcode_username, year)()
        if(error){
            return NextResponse.json({ error }, { status: 404 })
        }
        return NextResponse.json({ submissionCalendarResponse }, { status: 200 })
    } 
    catch(err: any){
        return NextResponse.json({ error: "Failed to fetch Leetcode data" }, { status: 500 })
    }
} 