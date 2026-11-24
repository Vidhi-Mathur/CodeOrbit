import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/lib/connect";
import User from "@/lib/models/User";
import { generateProfileReview } from "@/lib/ai/profileReview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { buildAIProfile, generateProfileHash } from "@/lib/ai/buildAIProfile";
import { redis } from "@/lib/rateLimit";

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({
                errors: {
                    formErrors: ["Unauthorized"]
                }
            }, { status: 401 })
        }
        await connectToDB()
        const user = await User.findOne({ email: session.user.email }).select("name email image username education platforms")
        if(!user){
            return NextResponse.json({
                errors: {
                    formErrors: ["User not found"]
                }
            }, { status: 404 })
        }
        const body = await req.json().catch(() => ({}));
        const shouldRegenerate = body?.forceRefresh === true;
        //Add github, etc 
        const profile = buildAIProfile({ user })
        const cacheKey = generateProfileHash(profile);
        if(!shouldRegenerate){
            const cachedReview = await redis.get(cacheKey);
            if (cachedReview) {
                return NextResponse.json(cachedReview);
            }

        }
        const review = await generateProfileReview(user);
        await redis.set(cacheKey, review);
        return NextResponse.json(review);
    } 
    catch(error){
        console.log(error)
        return NextResponse.json({ error: "Failed to generate profile review." }, { status: 500 });
    }
}