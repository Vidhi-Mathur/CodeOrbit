import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

//TODO: Rate limit this
export async function POST(req: NextRequest){
    const { platform, username } = await req.json()
    if(!username || !platform){
        return Response.json({ error: "Platform and username are required" }, { status: 400 })
    }
    revalidateTag(`${platform}-${username}`)
    return Response.json({success: true})
}
