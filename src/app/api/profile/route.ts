import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import connectToDB from "@/lib/connect"
import User from "@/lib/models/User"
import { authOptions } from "@/lib/authOptions"
import { OnboardingSchema } from "@/lib/validations/onboarding"
import { removeEmptyStrings } from "@/lib/helper"

export async function GET() {
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
    return NextResponse.json(user)
} 

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({
            errors: {
                formErrors: ["Unauthorized"]
            }
        }, { status: 401 })
    }
    await connectToDB()
    const body = await req.json()
        try {
        const parsed = OnboardingSchema.strict().safeParse(body)
        if(!parsed.success){
            const formattedErrors: Record<string, string> = {}
            parsed.error.issues.forEach((issue) => {
                const fieldName = issue.path[issue.path.length - 1] as string
                formattedErrors[fieldName] = issue.message
            })          
            return NextResponse.json({
                errors: {
                    fieldErrors: formattedErrors
                }
            }, { status: 400 })
        }
        const { basicDetails, education, codingProfiles, development, social } = parsed.data
        const existingUsername = await User.findOne({ username: basicDetails.username, email: { $ne: session.user.email }})
        if(existingUsername){
            return NextResponse.json({
                errors: {
                    fieldErrors: {
                        username: "Username already taken"
                    }
                }
            }, { status: 409 })
        }
        removeEmptyStrings(education)
        removeEmptyStrings(social)
        let updatedFields: any = {
            username: basicDetails.username,
            isOnboarded: true,
            education,
            platforms: {
                dsa: codingProfiles,
                dev: development,
                social
            }
        }
        const updatedUser = await User.findOneAndUpdate({ email: session.user.email }, { $set: updatedFields }, { new: true })
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 })
    } 
    catch(err: any){
        return NextResponse.json({
            errors: {
                formErrors: ["Internal Server Error"]
            }
        }, { status: 500 })
    }
}