import type { Credential } from "@/interfaces/authInterface";

export const providers: string[] = ["google", "github", "twitter"] as const
export type Provider = typeof providers[number]

export const loginCredentials: Credential[] = [{
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true
  }, {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true
  }
]

export const signupCredentials: Credential[] = [{
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true
  },
    ...loginCredentials
]