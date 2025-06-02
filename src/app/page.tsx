import Image from "next/image"
import Link from "next/link"
import ImageCarousel from "@/components/ui/ImageDisplay"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SpeedIcon from "@mui/icons-material/Speed"
import { features } from "@/constants/homepageConstants"
import { FeatureCard } from "@/components/ui/FeatureCard"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <Image src="/bg/bg3.png" alt="Background" fill className="object-cover opacity-95" priority />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/40 to-cyan-50/50" />
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
        </div>
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1B2E] leading-tight">
                        Showcase Your{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Developer Journey
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                        The ultimate all-in-one portfolio tracker that helps developers{" "}
                        <span className="font-bold text-[#1A1B2E]">organize</span>,{" "}
                        <span className="font-bold text-[#1A1B2E]">showcase</span>, and{" "}
                        <span className="font-bold text-[#1A1B2E]">monitor</span> their projects and skills across platforms.
                    </p>
                    <div className="flex flex-wrap gap-6 pt-6">
                    <Link href="/onboarding" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Get Started Now
                        <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
            <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl blur-2xl opacity-30" />
                    <ImageCarousel />
                </div>
            </div>
        </section>
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <SpeedIcon style={{ fontSize: "16px" }} />
                    Powerful Features
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1B2E] mb-6 tracking-tight">
                    Everything You Need in One Place
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
                    Track your progress, showcase your skills, and connect with opportunities - all from a single, powerful dashboard designed for modern developers.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} gradient={feature.gradient} />
                ))}
            </div>
        </section>
        <footer className="bg-[#1A1B2E] text-white py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
            <div className="max-w-7xl mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            CodeOrbit
                        </h3>
                        <p className="text-blue-200 text-lg font-medium max-w-md">
                            Empowering developers worldwide to showcase their skills, track their progress, and accelerate their careers through intelligent portfolio management.
                        </p>
                    </div>
                </div>
                <div className="border-t border-blue-800 mt-6 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-blue-300 font-medium">
                      &copy; {new Date().getFullYear()} CodeOrbit. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {["Privacy Policy", "Terms of Service"].map((text) => (
                        <Link href="/" key={text} className="text-blue-300 hover:text-white transition-colors">
                            {text}
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}