import { notFound } from "next/navigation"
import connectToDB from "@/lib/connect"
import User from "@/lib/models/User"
import ProfileComponent from "@/components/ui/ProfileComponent"

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
    let { username } = await params
    await connectToDB()
    const user = await User.findOne({ username }).select("name email image username education platforms")
    if(!user) return notFound()
    return (
        <ProfileComponent user={JSON.parse(JSON.stringify(user))} />
    )
}