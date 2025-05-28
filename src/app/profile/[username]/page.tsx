import connectToDB from "@/lib/connect"
import User from "@/lib/models/User"
import ProfileComponent from "@/components/ui/ProfileComponent"

export default async function Profile({ params }: { params: { username: string } }) {
    let { username } = params
    await connectToDB()
    const user = await User.findOne({ username })
    if(!user){
        return <div>User not found</div>
    }
    return (
       <ProfileComponent user={JSON.parse(JSON.stringify(user))} />
    )
}