import { DsaLink, DSA_LINKS } from "@/constants/profileConstant"
import { StatsProps } from "@/interfaces/profileInterfaces"
import Image from "next/image"

const DSAStats = ({ onClick, activePlatform }: StatsProps<DsaLink>) => {
    return (
        <div className="flex flex-row sm:flex-row md:flex-row lg:flex-col gap-2 sm:gap-3 md:gap-2 lg:gap-2 mt-6 sm:mt-3 md:mt-4 lg:mt-4 ml-1 sm:ml-1.5 md:ml-1 lg:ml-2 justify-center lg:justify-start">
            {Object.values(DSA_LINKS).map((platform) => (
                <button key={platform} onClick={() => onClick(platform)} className={`p-2 sm:p-2.5 md:p-2 lg:p-3 w-10 sm:w-12 md:w-10 lg:w-14 h-10 sm:h-12 md:h-10 lg:h-14 rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center border hover:border-black ${activePlatform === platform && "border-black"}`}>
                    <Image src={`/dsa/${platform}.svg`} width={18} height={18} className="sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-6 lg:h-6" alt={platform} />
                </button>
            ))}
        </div>
    )
}

export default DSAStats
