import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "@/components/ui/ImageDisplay";


export default function Home() {
    return (
      <div>
        <Image src="/bg/bg2.png" alt="Background" fill className="absolute -top-60 left-0"/>
        <ImageCarousel />
      </div>
    );
  }
  
