"use client";
import Image from "next/image";
import Slider from "react-slick";

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const images = [
        "/bg/intro1_pc.png",
        "/bg/intro2_pc.png",
        "/bg/intro3_pc.png",
    ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-20">
        <Slider {...settings}>
            {images.map((src, i) => (
                <div key={i}>
                    <Image src={src} alt={`Slide ${i + 1}`} width={800} height={800} className="rounded-xl" />
                </div>
            ))}
        </Slider>
    </div>
  );
};

export default ImageCarousel;
