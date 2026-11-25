import { getCachedLeetcodeData, verifyLeetcode } from '@/lib/services/dsa/leetcode/common';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ leetcode_username: string }> }) {
    const { leetcode_username } = await params;

    if(!leetcode_username){
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    
    try {
        const verifyMode = req.nextUrl.searchParams.get("verify") === "true"
        if(verifyMode){
            const isValid = await verifyLeetcode(leetcode_username)
            if(!isValid){
                return NextResponse.json({ valid: false, message: "Leetcode user not found" }, { status: 404 })
            }
            return NextResponse.json({ valid: true }, { status: 200 });
        }
        const { profileResponse, contestResponse, submissionCalendarResponse, errors } = await getCachedLeetcodeData(leetcode_username)()
        return NextResponse.json({ profileResponse, contestResponse, submissionCalendarResponse, errors }, { status: 200 })
    } 
    catch(err: any){
        return NextResponse.json({ error: "Failed to fetch Leetcode data" }, { status: 500 })
    }
} 