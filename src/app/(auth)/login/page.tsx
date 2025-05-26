import React from "react"
import { AuthForm } from "@/components/auth/AuthForm";
import { loginCrendentials } from "@/constants/authContant";

const Login = () => {
    return (
        <AuthForm heading="Login" subheading="Doesn't have an account?" redirectLink="/signup" redirectText="Join your Dev-verse now!" crendentials={loginCrendentials}/>
    )
}

export default Login;

