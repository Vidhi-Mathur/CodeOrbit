import { infoLinks } from "@/constants/profileConstant";
import { InfoInterface } from "@/interfaces/profileInterfaces";
import { getRedirection } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";

export const SocialLinks = ({ info, email }: { info: InfoInterface; email: string }) => (
    <>
        {infoLinks.map((key) => {
            const show = key === "email" || (key in info && info[key as keyof InfoInterface]);
            if(!show) return null;
            const href = getRedirection(key, info, email);
            return (
              <Link key={key} href={href} className="p-2 sm:p-3 lg:p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white flex items-center justify-center flex-shrink-0" target="_blank" rel="noopener noreferrer">
                  <Image src={`/common/${key}.svg`} width={20} height={20} alt={key} className="sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
              </Link>
            )
        })}
    </>
)