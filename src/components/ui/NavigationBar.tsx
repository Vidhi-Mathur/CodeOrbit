import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { SideBar } from "./SideBar"
import { authOptions } from "@/authOptions";

export const NavigationBar = async() => {
const session = await getServerSession(authOptions)
  return (
    <div>
        <div className="fixed top-0 left-0 z-50 flex items-center justify-between backdrop-blur-md h-[72px] w-full px-2 pt-2 text-white">
            <div className="relative -left-1 h-24 w-24">
                <Link href="/">
                    <Image src="/common/logo.png" alt="logo" width={120} height={120} className="object-contain" />
                </Link>
            </div>
            <nav className="space-x-4">
                {session?.user? (
                   <SideBar name={session.user.name ?? "User"} image={session.user.image ?? "/common/user.png"} username={session.user.username ?? "To_Be_Onboarded"} />
                ): (
                    <Link href="/login" className="px-5 py-2 bg-[#03357a] text-white rounded-xl font-semibold text-xl">
                        Login
                    </Link>
                )}
            </nav>
        </div>
    </div>
  );
};
