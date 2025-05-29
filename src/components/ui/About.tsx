import { infoLinks } from "@/constants/profileConstant"
import { AboutProps } from "@/interfaces/profileInterfaces";
import { Dot, GraduationCap, MapPinIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";

export const About = ({ name = "User's Name", username = "User's Username", image, email, education, info }: AboutProps) => {
    let getRedirection = (key: string): string => {
        switch (key) {
            case "email":
                return `mailto:${email}`;
            case "linkedin":
                return `https://www.linkedin.com/in/${info.linkedin}` || "/";
            case "twitter":
                return `https://x.com/${info.X}` || "/";
            case "website":
                return `${info.website}` || "/";
            default:
                return "/";
        }
    }
    return (
        <div className="text-black">
            <div className="flex flex-col md:flex-row items-start md:items-start gap-2 justify-between">
                <div className="flex flex-col gap-2">
                    <div className="relative rounded-full w-24 h-24 overflow-hidden">
                        <Image className="object-cover" src={image || "/bg/profile.png"} alt="Profile" fill />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold">{name}</h2>
                        <p className="text-gray-600">@{username}</p>
                    </div>
                </div>
                <div className="flex-1 md:mx-6">
                    <div className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 rounded-2xl shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-3 md:w-[65%]">
                                <div className="flex items-start gap-2">
                                    <GraduationCap className="w-6 h-6" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{education.degree}</h3>
                                        <h3 className="text-gray-500 flex items-center">
                                            <span className="inline-flex items-center mr-1"><Dot /></span>
                                            With Specialization in {education.branch}
                                        </h3>
                                        <h3 className="text-gray-500 flex items-center">
                                            <span className="inline-flex items-center mr-1"><Dot /></span>
                                            {`${Number(education.gradYear) < new Date().getFullYear() ? "Graduated in" : "To be graduated in"} ${education.gradYear}`}
                                        </h3>
                                        <h3 className="text-gray-700 flex items-center">
                                            <span className="inline-flex items-center mr-1"><Dot /></span>
                                            From {education.college}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Image src="/common/current_profile.svg" width={20} height={20} alt="Currentprofile" className="ml-1" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{education.current_profile}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 md:w-[30%] md:ml-auto md:mr-4">
                                <MapPinIcon className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900 mt-1">{education.location}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 -mt-4 md:-mt-4">
                    {infoLinks.map((info) => { 
                        const href = getRedirection(info)
                        return (
                            <Link href={href} key={info} className="p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                                <Image src={`/common/${info}.svg`} width={24} height={24} alt={info} />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}