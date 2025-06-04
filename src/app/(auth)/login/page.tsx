import React from "react"
import { AuthForm } from "@/components/auth/AuthForm";
import { loginCredentials } from "@/constants/authConstant";

const Login = () => {
    return (
        <AuthForm heading="Login" subheading="Doesn't have an account?" redirectLink="/signup" redirectText="Join your Dev-verse now!" credentials={loginCredentials}/>
    )
}

export default Login;

