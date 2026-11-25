import { getCachedLeetcodeCalendar } from '@/lib/services/dsa/leetcode/calendar';
import { NextRequest, NextResponse } from 'next/server';

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