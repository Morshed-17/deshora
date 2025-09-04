"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  
} from "@/components/ui/carousel";

import Image from "next/image";

function MainBanner() {
  const banners = [
    { name: "first", image: "/images/banner1.jpg", link: "/shop" },
    { name: "second", image: "/images/banner2.jpg", link: "/shop" },
    { name: "third", image: "/images/banner3.jpg", link: "/shop" },
  ];

  return (
    <div className="">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Image
                src={banner.image}
                height={500}
                width={2400}
                alt={banner.name}
                className="cursor-pointer"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MainBanner;
