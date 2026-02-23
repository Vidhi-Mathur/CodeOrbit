"use client"
import axios from "axios"
import type React from "react"
import { useRouter } from "next/navigation"
import type { FormDataInterface } from "@/interfaces/onboardingInterface"
import { ProfileForm } from "@/components/ui/ProfileForm"

export default function OnboardingPage() {
    const router = useRouter()

    const submitHandler = async(data: FormDataInterface) => {
        const response = await axios.post("/api/onboarding", data)
        if(response.status === 200){
            router.push(`/profile/${data.basicDetails.username}`)
        }
    }

    return (
        <ProfileForm mode="create" onSubmit={submitHandler} />
    ) 
}