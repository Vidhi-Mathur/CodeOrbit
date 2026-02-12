import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

//TODO: Rate limit this
export async function POST(req: NextRequest, { params }: { params: { github_username: string }}){
    const { github_username } = await params
    if(!github_username){
        return Response.json({ error: "GitHub username is required" }, { status: 400 })
    }
    revalidateTag(`github-${github_username}`)
    return Response.json({success: true})
}
