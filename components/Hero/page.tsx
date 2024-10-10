import Image from "next/image";
import HeroText from "../HeroText/page";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/side3.jpg",
    "/side2.jpg",
    "/side.jpg",
    "/side4.jpg",
    "/side5.jpg",
    "/side6.jpg",
    "/side7.jpg",
  ];
  const changeInterval = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [images.length, changeInterval]);

  return (
    <section className="relative h-screen flex items-center justify-around bg-gray-100 text-gray-900">
      <div className="absolute inset-0 bg-teal-600 bg-opacity-50"></div>

      <div className="w-[53%]">
        <div className="h-full w-full">
          <div className="absolute inset-0 py-10">
            <Image
              src="/bg.png"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              className="opacity-10"
            />
          </div>
        </div>
        <HeroText />
      </div>

      <div className="w-[47%] relative h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentImage
                ? "translate-y-0 z-10 opacity-100"
                : index === (currentImage - 1 + images.length) % images.length
                ? "translate-y-200 z-10 opacity-100"
                : "translate-y-full z-0 opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-1000 ease-in-out"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .translate-y-0 {
          transform: translateY(0%);
          opacity: 1;
        }

        .translate-y-full {
          transform: translateY(100%);
          opacity: 0;
        }

        .translate-y-200 {
          transform: translateY(-100%);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
