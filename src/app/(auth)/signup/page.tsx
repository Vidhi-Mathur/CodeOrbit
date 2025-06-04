import { AuthForm } from "@/components/auth/AuthForm"
import { signupCredentials } from "@/constants/authContant"

const Signup = () => {
    return (
        <AuthForm heading="Signup" subheading="Already in orbit?" redirectLink="/login" redirectText="Log in here!" credentials={signupCredentials}/>
    )
}

export default Signup