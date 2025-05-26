import type { Credential } from "@/interfaces/authInterface";

export const providers: string[] = ["google", "github", "twitter"] as const
export type Provider = typeof providers[number]

export const loginCrendentials: Credential[] = [
    {
        label: "Email",
        type: "email",
        placeholder: "Enter your email"
    },
    {
        label: "Password",
        type: "password",
        placeholder: "Enter your password"
    }
];

export const signupCrendentials: Credential[] = [
    {
        label: "Name",
        type: "text",
        placeholder: "Enter your name"
    },
    {
        label: "Email",
        type: "email",
        placeholder: "Enter your email"
    },
    {
        label: "Password",
        type: "password",
        placeholder: "Enter your password"
    }
];