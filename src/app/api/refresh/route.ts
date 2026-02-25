import { rateLimiter } from "@/lib/rateLimit"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    const { platform, username } = await req.json()
    if(!username || !platform){
        return NextResponse.json({ error: "Platform and username are required" }, { status: 400 })
    }
    const ip = req.headers.get("x-forwarded-for")?? req.headers.get("x-real-ip")?? "anonymous"
    const { success } = await rateLimiter.limit(ip)
    if(!success){
        return NextResponse.json({ error: "Too many refresh attempts. Try again later." }, { status: 429 })
    }
    revalidateTag(`${platform}-${username}`)
    return NextResponse.json({success: true})
}