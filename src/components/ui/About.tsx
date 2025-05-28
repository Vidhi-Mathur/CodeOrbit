import { infoLinks } from "@/constants/profileConstant"
import { AboutProps } from "@/interfaces/profileInterfaces";
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