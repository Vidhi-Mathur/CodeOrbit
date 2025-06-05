import Image from "next/image"
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { AboutProps } from "@/interfaces/profileInterfaces";
import { SocialLinks } from "./SocialLinks";

export const About = ({ name, username, image, email, education, info }: AboutProps) => {
    return (
        <div className="text-black">
            <div className="flex flex-col lg:flex-row md:flex-row lg:items-start md:items-start lg:gap-2 md:gap-2 lg:justify-between md:justify-between">
                <div className="flex flex-col sm:flex-row lg:flex-col md:flex-col items-center sm:items-start lg:items-start md:items-center gap-3 sm:gap-4 lg:gap-2 md:gap-2 mb-4 sm:mb-6 lg:mb-0 md:mb-0">
                    <div className="relative rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-24 md:w-24 md:h-24 overflow-hidden flex-shrink-0">
                        <Image className="object-cover" src={image} alt="Profile" width={100} height={100} sizes="(max-width: 600px) 80px, 100px" priority />
                    </div>
                    <div className="text-center sm:text-left lg:text-left md:text-center lg:mt-2 md:mt-2">
                        <h2 className="text-lg sm:text-xl lg:text-xl md:text-xl font-semibold">{name}</h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-base">@{username}</p>
                        <div className="flex flex-row justify-center sm:justify-start md:justify-center gap-2 mt-3 sm:hidden md:flex lg:hidden">
                            <SocialLinks info={info} email={email} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 lg:mx-6 md:mx-4 mb-4 sm:mb-6 lg:mb-0 md:mb-0">
                    <div className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-3 sm:p-4 lg:p-4 md:p-4 rounded-2xl shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col lg:flex-row md:flex-col lg:justify-between gap-3 sm:gap-4 lg:gap-4 md:gap-3">
                            <div className="space-y-2 sm:space-y-3 lg:space-y-3 md:space-y-2 lg:w-[65%]">
                                <div className="flex items-start gap-2">
                                    <SchoolIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                                    <div className="text-gray-700 min-w-0">
                                        <h3 className="text-xs sm:text-xs lg:text-xs md:text-xs font-semibold text-gray-900 uppercase tracking-wide mt-1"> 
                                            {education.degree}
                                        </h3>
                                        {education.branch && (
                                            <h3 className="flex items-start sm:items-center lg:items-center md:items-start text-sm sm:text-base lg:text-base md:text-sm mt-1">
                                                <span className="inline-flex items-center mr-2 flex-shrink-0 mt-1.5 sm:mt-0 lg:mt-0 md:mt-1.5">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                </span>
                                                <span className="break-words">With Specialization in {education.branch}</span>
                                            </h3>
                                        )}
                                        <h3 className="flex items-start sm:items-center lg:items-center md:items-start text-sm sm:text-base lg:text-base md:text-sm mt-1">
                                            <span className="inline-flex items-center mr-2 flex-shrink-0 mt-1.5 sm:mt-0 lg:mt-0 md:mt-1.5">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </span>
                                            <span className="break-words">{`${education.gradYear < new Date().getFullYear() ? "Graduated in" : "To be graduated in"} ${education.gradYear}`}</span>
                                        </h3>
                                        <h3 className="flex items-start sm:items-center lg:items-center md:items-start text-sm sm:text-base lg:text-base md:text-sm mt-1">
                                            <span className="inline-flex items-center mr-2 flex-shrink-0 mt-1.5 sm:mt-0 lg:mt-0 md:mt-1.5">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                            </span>
                                            <span className="break-words">From {education.college}</span>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BusinessCenterIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <h3 className="text-xs sm:text-xs lg:text-xs md:text-xs font-semibold text-gray-900 uppercase tracking-wide mt-1 break-words">
                                            {education.currentProfile}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-1 lg:w-[30%] md:w-full lg:ml-auto lg:mr-4">
                                <LocationOnIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 md:w-5 md:h-5 flex-shrink-0 mt-1" />
                                <div className="min-w-0">
                                    <h3 className="text-xs sm:text-xs lg:text-xs md:text-xs font-semibold text-gray-900 uppercase tracking-wide mt-2 break-words">
                                        {education.location}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex lg:flex md:hidden flex-row sm:flex-row lg:flex-col justify-center sm:justify-start lg:justify-start gap-2 lg:gap-2 lg:-mt-4">
                    <SocialLinks info={info} email={email} />
                </div>
            </div>
        </div>
    )
}