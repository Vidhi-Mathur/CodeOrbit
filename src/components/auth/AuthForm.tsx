"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Poppins, Montserrat } from "next/font/google"
import { providers } from "@/constants/authContant"
import type { AuthProps } from "@/interfaces/authInterface"
import { signIn } from "next-auth/react"

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

export const AuthForm: React.FC<AuthProps> = ({heading, subheading, redirectLink, redirectText, crendentials}) => {
    return (
        <div className="relative flex items-center justify-center h-screen">
            <div className="w-7/12 h-3/4 mt-10 flex shadow-lg rounded-lg overflow-hidden text-black bg-[#c1d5e9]">
                <div className="relative h-full">
                    <Image src="/bg/auth_pc.png" width={347.2} height={100} alt="Background" className="h-full object-cover" />
                </div>
                <div className={`flex flex-1 flex-col p-4 pt-6 ${poppins.className}`}>
                    <div className="max-w-md mx-auto w-full">
                    <h1 className={`text-2xl font-bold mb-2 ${montserrat.className}`}>{heading}</h1>
                        <p className="mb-3">{subheading}{" "}
                            <Link href={redirectLink} className="underline text-[#03357a]">{redirectText}</Link>
                        </p>
                        <form className="space-y-4">
                            {crendentials.map((credential) => (
                                <label className="block" key={credential.label}>
                                    <span className="text-black text-sm font-medium">{credential.label}</span>
                                    <input type={credential.type} className="block w-full bg-white mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-[#03357a] focus:ring-[#03357a] focus:ring-1" placeholder={credential.placeholder}/>     
                                </label>
                            ))}
                            <div className="flex justify-center w-full">
                                <button className="mt-2 px-5 py-2 bg-white text-[#03357a] border border-[#03357a] rounded-2xl font-bold">
                                    <Link href="/">{heading}</Link>
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-gray-600 mb-2">Or continue with</p>
                            <div className="flex justify-center gap-4">
                                {providers.map((provider) => (
                                    <button onClick={() => signIn(provider, { callbackUrl: "/profile" })} key={provider} className="p-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white">
                                        <Image src={`/common/${provider}.svg`} width={30} height={30} alt={`${provider}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}