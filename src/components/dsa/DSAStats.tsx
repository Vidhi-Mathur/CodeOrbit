import { cpLinks } from "@/constants/profileConstant"
import Image from "next/image"

const DSAStats = ({ onClick }: { onClick: (info: string) => void }) => {
    return (
        <div className="flex flex-col gap-2 mt-4 ml-2">
                {cpLinks.map((info) => ( 
                    <button key={info} onClick={() => onClick(info)} className="p-3 w-14 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center">
                        <Image src={`/dsa/${info}.svg`} width={24} height={24} alt={info} />
                    </button>
                ))}
        </div>
    )
}

export default DSAStats