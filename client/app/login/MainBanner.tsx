"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

function MainBanner() {
  const banners = [
    { name: "first", image: "/images/banner1.jpg", link: "/shop" },
    { name: "second", image: "/images/banner2.jpg", link: "/shop" },
    { name: "third", image: "/images/banner3.jpg", link: "/shop" },
  ];

  return (
    <div>
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
