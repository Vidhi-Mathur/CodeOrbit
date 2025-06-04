import Image from "next/image"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"

export default function NotFd() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image src="/bg/home_bg.png" alt="Page not found" fill className="object-cover" priority/>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-cyan-50/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-md">
            <h1 className="text-9xl font-black mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">404</span>
            </h1>
            <h2 className="text-5xl font-black mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Page Not Found
                </span>
            </h2>
            <p className="text-slate-700 text-xl font-bold mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600  px-8 py-4 rounded-2xl font-bold text-lg  transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm border text-white justify-center">
                <HomeIcon className="group-hover:scale-110 transition-transform" />
                Return Home
            </Link>
        </div>
    </div>
  )
}
