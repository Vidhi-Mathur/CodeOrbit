import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "../auth/Logout";

export const NavigationBar = async() => {
const session = await getServerSession(authOptions);
  return (
    <div>
        <div className="fixed top-0 left-0 z-100 flex items-center justify-between backdrop-blur-md h-[72px] w-full px-2 pt-2 text-white">
            <div className="relative -left-1 h-24 w-24">
                <Link href="/">
                    <Image src="/common/logo.png" alt="logo" fill className="object-contain" />
                </Link>
            </div>
            <nav className="space-x-4">
                {session? (
                    // <div className="rounded-full flex items-center justify-center">
                    //     <Image src={`${session.user?.image}`} alt="profile" width={50} height={50} className="rounded-full" unoptimized />
                    // </div>
                    <Logout />
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
