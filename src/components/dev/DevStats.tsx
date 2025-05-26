import Image from "next/image"
import { devLinks } from "@/constants/profileConstant"

const DevStats = ({ onClick }: { onClick: (info: string) => void }) => {
    return (
        <div className="flex flex-row gap-4 mt-4 ml-2">
            {devLinks.map((link) => (
                <button key={link} onClick={() => onClick(link)} className="p-3 w-14 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center mb-2">
                    <Image src={`/dev/${link}.svg`} width={24} height={24} alt={link} />
                </button>
            ))}
        </div>
    )
}

export default DevStats
