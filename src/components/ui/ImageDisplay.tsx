"use client"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    }

  const images = ["/bg/intro1_pc.png", "/bg/intro2_pc.png", "/bg/intro3_pc.png"]

  return (
    <div className="w-full max-w-2xl mx-auto relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-3xl blur-xl opacity-50" />
        <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
            <div className="relative aspect-[4/3] w-full">
                <Slider {...settings}>
                    {images.map((src, i) => (
                        <div key={i} className="relative">
                            <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden">
                              <Image src={src} alt={`CodeOrbit Dashboard ${i + 1}`} fill priority className="object-cover rounded-xl transform hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default ImageCarousel