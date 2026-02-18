import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import connectToDB from "@/lib/connect"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    await connectToDB()
    const user = await User.findOne({ email: session.user.email }).select("name email image username education platforms")
    if(!user){
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    return NextResponse.json(user)
} 


export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    await connectToDB()
    const { basicDetails, education, social, development, codingProfiles } = await req.json()
    try {
        if(!basicDetails?.username || !education?.degree || !education?.college || !education?.gradYear || !education?.location || !education?.currentProfile || !codingProfiles?.leetcode || !development?.github || !social?.linkedin){
            return NextResponse.json({ message: "Missing required fields for onboarding" }, { status: 400 })
        }
        let updatedFields: any = {
            username: basicDetails.username,
            isOnboarded: true,
            education: {
                degree: education.degree,
                branch: education?.branch?.trim()? education.branch.trim(): undefined,
                college: education.college,
                gradYear: Number(education.gradYear),
                location: education.location,
                currentProfile: education.currentProfile
            },
            platforms: {
                dsa: {
                    leetcode: codingProfiles.leetcode ,
                    codeforces: codingProfiles.codeforces
                },
                dev: {
                    github: development.github
                },
                others: {
                    website: social?.website?.trim()? social.website.trim(): undefined,
                    linkedin: social.linkedin,
                    twitter: social?.twitter?.trim()? social.twitter.trim(): undefined
                }
            }
        }
        const updatedUser = await User.findOneAndUpdate({ email: session.user.email }, { $set: updatedFields }, { new: true })
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 })
    } 
    catch(err){
        console.log(err)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}