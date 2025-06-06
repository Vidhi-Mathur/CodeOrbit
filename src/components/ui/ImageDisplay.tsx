"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { desktopImages, mobileImages, ScreenSize, settings } from "@/constants/homepageConstant"

const ImageCarousel = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>(ScreenSize.Desktop)

    useEffect(() => {
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

    const imagesToShow = screenSize === ScreenSize.Mobile ? mobileImages : desktopImages

    const getContainerClasses = () => {
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

    const getAspectRatio = () => {
        return screenSize === ScreenSize.Mobile ? "aspect-[2/3]" : "aspect-[3/2]"
    }

    return (
        <div className="w-full">
            <div className={`relative ${getContainerClasses()}`}>
                <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />
                <div className="relative bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-xl sm:shadow-2xl">
                    <div className="relative w-full">
                        <Slider {...settings}>
                            {imagesToShow.map((src, i) => (
                                <div key={`${screenSize}-${i}`} className="px-1">
                                    <div className={`w-full relative rounded-lg sm:rounded-xl overflow-hidden ${getAspectRatio()}`}>
                                        <Image src={src} alt={`CodeOrbit Dashboard ${i + 1}`} fill priority={i === 0} sizes="(max-width: 640px) 100vw, (max-width: 768px) 700px, 960px" className="object-cover rounded-lg sm:rounded-xl transform hover:scale-105 transition-transform duration-700" />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel