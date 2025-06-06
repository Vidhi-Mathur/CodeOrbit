"use client"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState, useEffect } from "react"
import Image from "next/image"
import Slider from "react-slick"
import { desktopImages, mobileImages, ScreenSize, settings } from "@/constants/homepageConstant"
import { CameraAlt } from "@mui/icons-material"

const ImageCarousel = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>(ScreenSize.Desktop)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const checkScreenSize = () => {
            const width = window.innerWidth
            if(width < 768) setScreenSize(ScreenSize.Mobile)
            else if (width < 1024) setScreenSize(ScreenSize.Tablet)
            else setScreenSize(ScreenSize.Desktop)
        }
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)
        return () => window.removeEventListener("resize", checkScreenSize)
    }, [])

    const getContainerClasses = () => {
        if(!isClient){
            return "max-w-[300px] sm:max-w-lg lg:max-w-2xl mx-auto"
        }
        switch (screenSize) {
            case ScreenSize.Mobile:
                return "max-w-[300px] mx-auto"
            case ScreenSize.Tablet:
                return "w-full max-w-lg"
            case ScreenSize.Desktop:
                return "w-full max-w-2xl"
            default:
                return "w-full max-w-2xl"
        }
    }

    const imagesToShow = screenSize === ScreenSize.Mobile? mobileImages: desktopImages

    return (
        <div className="w-full">
            <div className={`relative ${getContainerClasses()}`}>
                <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-xl sm:shadow-2xl">
                    <div className="relative w-full h-[450px] sm:h-[320px] lg:h-[400px]">
                        {!isClient? (
                            <div className="w-full h-full min-w-[300px] bg-gray-200 animate-pulse rounded-lg sm:rounded-xl flex items-center justify-center">
                                <div className="text-gray-400 text-sm">
                                    <CameraAlt />
                                </div>
                            </div>
                        ) : (
                            <Slider {...settings} className="h-full">
                                {imagesToShow.map((src, i) => (
                                    <div key={`${screenSize}-${i}`} className="px-1 h-full">
                                        <div className="w-full h-full relative rounded-lg sm:rounded-xl overflow-hidden">
                                          <Image src={src} alt={`CodeOrbit Dashboard ${i + 1}`} fill priority={i === 0} sizes="(max-width: 640px) 300px, (max-width: 768px) 500px, 800px" className="object-cover rounded-lg sm:rounded-xl transform hover:scale-105 transition-transform duration-700" style={{ objectFit: "cover" }}
                                          />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel