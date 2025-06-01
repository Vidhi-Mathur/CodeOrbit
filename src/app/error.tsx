"use client"

import Image from "next/image"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"

export default function Error() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="hidden md:block absolute inset-0">
        <Image src="/bg/error_pc.png" alt="404 Page Not Found" fill className="object-cover" priority />
      </div>
      <div className="block md:hidden absolute inset-0">
        <Image src="/bg/error_found.png" alt="404 Page Not Found" fill className="object-cover" priority />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-6">
        <div className="flex-1"></div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group bg-white/95 hover:bg-white text-blue-600 hover:text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm border border-white/20"
            >
              <HomeIcon className="group-hover:scale-110 transition-transform" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
