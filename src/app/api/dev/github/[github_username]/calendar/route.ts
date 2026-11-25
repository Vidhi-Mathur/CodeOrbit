import { NextRequest, NextResponse } from 'next/server'
import { getCachedGithubCalendar } from '@/lib/services/dev/calendar'

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