"use client"
import axios from "axios"
import type React from "react"
import { useRouter } from "next/navigation"
import type { FormDataInterface } from "@/interfaces/onboardingInterface"
import { initialFormData } from "@/constants/onboardingConstant"
import { ProfileForm } from "@/components/ui/ProfileForm"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

export default function EditPage(){
    const router = useRouter()
    const { data: session, status } = useSession()
    const [formData, setFormData] = useState<FormDataInterface>(initialFormData)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
        if(status === "loading") return   
        if(session && !session.user.isOnboarded){
            router.replace("/onboarding")
        }
    }, [session, status])

    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const response = await axios.get(`/api/profile`) 
                const profile = response.data
                setFormData({
                    basicDetails: {
                        username: profile.username || ""
                    },
                    education: {
                        degree: profile.education?.degree || "",
                        college: profile.education?.college || "",
                        branch: profile.education?.branch || "",
                        gradYear: profile.education?.gradYear || new Date().getFullYear(),
                        location: profile.education?.location || "",
                        currentProfile: profile.education?.currentProfile || "",
                    },
                    social: {
                        linkedin: profile.platforms.social?.linkedin || "",
                        twitter: profile.platforms.social?.twitter || "",
                        website: profile.platforms.social?.website || "",
                    },
                    development: {
                        github: profile.platforms.dev?.github || "",
                    },
                    codingProfiles: {
                        leetcode: profile.platforms.dsa?.leetcode || "",
                        codeforces: profile.platforms.dsa?.codeforces || ""
                    },
                })
            }  
            finally{
                setIsFetching(false)
            }
        }
        fetchProfile()
    }, [])

    const submitHandler = async(data: FormDataInterface) => {
        const response = await axios.put("/api/profile", data)
        if(response.status === 200){
            router.push(`/profile/${data.basicDetails.username}`)
        }
    }
    
    return (
        <ProfileForm mode="edit" onSubmit={submitHandler} initialData={formData} isFetching={isFetching} />
    )
} 