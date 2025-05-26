import { AuthForm } from "@/components/auth/AuthForm"
import { signupCrendentials } from "@/constants/authContant"

const Signup = () => {
    return (
        <AuthForm heading="Signup" subheading="Already in orbit?" redirectLink="/login" redirectText="Log in here!" crendentials={signupCrendentials}/>
    )
}

export default Signup