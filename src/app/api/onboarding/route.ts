import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import connectToDB from "@/lib/connect"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/authOptions"

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    await connectToDB()
    const body = await req.json()
    const { basicDetails, education, social, development, codingProfiles } = body
    try {
        //Initial validation
        if(!basicDetails?.username || !education?.degree || !education?.college || !education?.gradYear || !education?.location || !education?.currentProfile || !codingProfiles?.leetcode || !development?.github || !social?.linkedin){
            return NextResponse.json({ message: "Missing required fields for onboarding" }, { status: 400 })
        }
        const updatedUser = await User.findOneAndUpdate({ email: session.user.email }, {
            username: basicDetails.username,
            isOnboarded: true,
            education: {
                degree: education.degree,
                branch: education?.branch,
                college: education.college,
                gradYear: Number(education.gradYear),
                location: education.location,
                currentProfile: education.currentProfile
            },
            platforms: {
                dsa: {
                    leetcode: codingProfiles.leetcode ,
                    geeksforgeeks: codingProfiles?.geeksforgeeks,
                    codeforces: codingProfiles?.codeforces,
                    codechef: codingProfiles?.codechef,
                    hackerrank: codingProfiles?.hackerrank,
                    interviewbit: codingProfiles?.interviewbit,
                    codingninjas: codingProfiles?.codingninjas
                },
                dev: {
                    github: development.github
                },
                others: {
                    website: social?.website,
                    linkedin: social.linkedin,
                    twitter: social?.twitter
                }
            }
        }, { new: true })
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 })
    } 
    catch(err){
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
