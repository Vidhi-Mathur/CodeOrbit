"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Poppins, Montserrat } from "next/font/google"
import { providers } from "@/constants/authContant"
import type { AuthProps } from "@/interfaces/authInterface"
import { signIn } from "next-auth/react"
import { LoadingSpinner } from "../ui/ShimmerUI"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
})

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700", "800"],
    variable: "--font-montserrat",
    display: "swap",
})

export const AuthForm: React.FC<AuthProps> = ({ heading, subheading, redirectLink, redirectText, credentials }) => {
    //For custom credentials
    const [formData, setFormData] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const isSignup = credentials.length >= 3

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const response = await signIn("credentials", {
                ...formData,
                redirect: false,
            })
            if(response?.error){
                setError(response.error)
            } 
            else if (response?.ok){
                window.location.href = "/"
            }
        } 
        finally {
          setLoading(false)
        }
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-7">
            <div className="absolute inset-0 -z-10">
                <Image src="/bg/auth_bg.png" alt="Background" fill className="object-cover opacity-90" priority />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/5 to-cyan-50/50" />
            </div>
            <div className="w-full mx-auto flex justify-center">
                <div className="flex flex-col lg:flex-row shadow-lg rounded-lg text-black bg-[#c1d5e9] mt-16 md:mt-12 sm:mt-8 w-full h-[600px] sm:h-[650px] lg:h-[550px] max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-3xl xl:max-w-4xl">
                    {/* On top, small/ medium screen */}
                    <div className="block lg:hidden relative w-full aspect-[3/2] flex-shrink-0">
                        <Image src="/bg/auth_mobile.png" fill alt="Background" className="object-cover" />
                    </div>
                    {/* On left, for large screen */}
                    <div className="hidden lg:block relative lg:w-2/5 flex-shrink-0">
                        <Image src="/bg/auth_pc.png" fill alt="Background" className="object-cover" />
                    </div>
                    <div className={`flex flex-1 flex-col p-4 sm:p-6 lg:p-5 xl:p-7 ${poppins.className}`}>
                        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
                            <div className={`text-center lg:text-left ${isSignup ? "mb-2 sm:mb-2 lg:mb-1" : "mb-4 sm:mb-4 lg:mb-1"}`}>
                                <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isSignup ? "mb-1 sm:mb-1" : "mb-2 sm:mb-3"} ${montserrat.className}`}>
                                    {heading}
                                </h1>
                                <p className={`text-sm sm:text-base ${isSignup ? "mb-1 sm:mb-2" : "mb-4 sm:mb-6"}`}>
                                    {subheading}{" "}
                                    <Link href={redirectLink} className="underline text-[#03357a] hover:text-[#02285a] transition-colors">
                                        {redirectText}
                                    </Link>
                                </p>
                            </div>
                            <form className={`${isSignup ? "space-y-4 sm:space-y-5 lg:space-y-5" : "space-y-3 sm:space-y-4 lg:space-y-5"}`} onSubmit={submitHandler}>
                                {credentials.map((credential) => (
                                    <label className="block" key={credential.label}>
                                        <span className={`text-black text-sm sm:text-base font-medium block ${isSignup ? "mb-0.5" : "mb-1"}`}>
                                            {credential.label}
                                        </span>
                                        <input type={credential.type} name={credential.name} required={credential.required} className={`block w-full bg-white px-3 border border-gray-300 rounded-md shadow-sm focus:border-[#03357a] focus:ring-[#03357a] focus:ring-1 text-sm sm:text-base transition-colors ${isSignup ? "py-1.5 sm:py-2" : "py-2 sm:py-3"}`} placeholder={credential.placeholder} onChange={changeHandler} />
                                    </label>
                                ))}
                                <div className={`w-full flex flex-col items-center ${isSignup ? "mt-6 sm:mt-6" : "mt-4 sm:mt-6"}`}>
                                    {error && (
                                        <p className={`text-red-500 text-sm sm:text-base text-center w-full ${isSignup ? "mb-1 sm:mb-2" : "mb-3 sm:mb-4"}`}>
                                            {error}
                                        </p>
                                    )}
                                    <button type="submit" disabled={loading} className={`w-full sm:w-auto px-6 sm:px-8 bg-white text-[#03357a] border border-[#03357a] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#03357a] hover:text-white hover:border-white transition-all duration-200 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed ${isSignup ? "py-2 sm:py-3" : "py-3 sm:py-4"}`}>
                                        {loading ? (
                                            <>
                                                <LoadingSpinner />
                                                Processing...
                                            </>
                                        ) : (
                                            heading
                                        )}
                                    </button>
                                </div>
                            </form>
                            <div className={`text-center ${isSignup ? "mt-2 sm:mt-2 lg:mt-3" : "mt-4 sm:mt-4 lg:mt-6"}`}>
                                <p className={`text-gray-600 text-sm sm:text-base ${isSignup ? "mb-1 sm:mb-2" : "mb-3 sm:mb-4"}`}>
                                    Or continue with
                                </p>
                                <div className="flex justify-center gap-3 sm:gap-4">
                                    {providers.map((provider) => (
                                        <button onClick={() => signIn(provider, { callbackUrl: "/?redirect=true" })} key={provider} className={`rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 bg-white hover:scale-105 ${isSignup ? "p-1.5 sm:p-2" : "p-2 sm:p-3"}`}>
                                            <Image src={`/common/${provider}.svg`} width={isSignup ? 24 : 30} height={isSignup ? 24 : 30} alt={`${provider}`} className={`${isSignup ? "w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]" : "w-[30px] h-[30px]"}`}/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
