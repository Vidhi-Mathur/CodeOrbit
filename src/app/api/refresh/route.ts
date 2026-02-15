import { rateLimiter } from "@/lib/rateLimit"
import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest){
    const { platform, username } = await req.json()
    if(!username || !platform){
        return Response.json({ error: "Platform and username are required" }, { status: 400 })
    }
    const ip = req.headers.get("x-forwarded-for")?? req.headers.get("x-real-ip")?? "anonymous"
    const { success } = await rateLimiter.limit(ip)
    if(!success){
        return Response.json({ error: "Too many refresh attempts. Try again later." }, { status: 429 })
    }
    revalidateTag(`${platform}-${username}`)
    return Response.json({success: true})
}