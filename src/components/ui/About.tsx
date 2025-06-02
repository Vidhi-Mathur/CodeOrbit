import { infoLinks } from "@/constants/profileConstant"
import type { AboutProps, InfoInterface } from "@/interfaces/profileInterfaces";
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Image from "next/image"
import Link from "next/link";

export const About = ({ name, username, image, email, education, info }: AboutProps) => {
    let getRedirection = (key: string): string => {
        switch (key) {
            case "email":
                return `mailto:${email}`;
            case "linkedin":
                return `https://www.linkedin.com/in/${info.linkedin}`;
            case "twitter":
                return info.twitter ? `https://x.com/${info.twitter}` : "/";
            case "website":
                return info.website || "/";
            default:
                return "/";
        }
    }
    return (
        <div className="text-black">
            <div className="flex flex-col md:flex-row items-start md:items-start gap-2 justify-between">
                <div className="flex flex-col gap-2">
                    <div className="relative rounded-full w-24 h-24 overflow-hidden">
                        <Image className="object-cover" src={image} alt="Profile" fill />
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
                                    <SchoolIcon className="w-6 h-6" />
                                    <div className="text-gray-700">
                                        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mt-1">{education.degree}</h3>
                                        {education.branch && (
                                            <h3 className="flex items-center">
                                                <span className="inline-flex items-center mr-2">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                </span>
                                                With Specialization in {education.branch}
                                            </h3>
                                        )}
                                        <h3 className="flex items-center">
                                            <span className="inline-flex items-center mr-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </span>
                                            {`${education.gradYear < new Date().getFullYear() ? "Graduated in" : "To be graduated in"} ${education.gradYear}`}
                                        </h3>
                                        <h3 className="flex items-center">
                                            <span className="inline-flex items-center mr-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </span>
                                            From {education.college}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BusinessCenterIcon />
                                    <div>
                                        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mt-1">{education.currentProfile}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-1 md:w-[30%] md:ml-auto md:mr-4">
                                <LocationOnIcon className="mt-1" />
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mt-2">{education.location}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 -mt-4 md:-mt-4">
                    {infoLinks.map((key) => { 
                        if((key !== "email" && !info[key as keyof InfoInterface])) return null;
                        const href = getRedirection(key)
                        return (
                            <Link href={href} key={key} className="p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                                <Image src={`/common/${key}.svg`} width={24} height={24} alt={key} />
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}