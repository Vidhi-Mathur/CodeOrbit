import { getCachedGithubData, verifyGithub } from '@/lib/services/dev/common'
import { NextRequest, NextResponse } from 'next/server'

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
        console.log(err)
        if(err.code === 404){
            return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
    }
}