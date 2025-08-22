"use client";
import Container from "@/components/ui/Container";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from "@/components/ui/SectionTitle";
import { ICategory } from "@/types/type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
function TrendingCategories() {
  const { data } = useGetAllCategoriesQuery(undefined);

  const categories: ICategory[] = data?.data;
  return (
    <Container full>
      <SectionTitle>Trending Categories</SectionTitle>

      <Carousel
        className="w-full "
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 w-9 h-9 z-10 bg-white p-2 rounded-none flex items-center justify-center">
          <ChevronLeft />
        </CarouselPrevious>

        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 w-9 h-9 z-10 bg-white p-2 rounded-none flex items-center justify-center">
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>

        <CarouselContent className="-ml-1 ">
          {categories?.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/5 "
            >
              <div className="p-1">
                <AspectRatio ratio={369 / 461}>
                  <Image
                    src={category.image}
                    fill
                    alt={category.title}
                    className="object-cover "
                  />
                  {/* Overlay for centered text */}
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="absolute inset-0 bottom-5  flex items-end justify-center px-6"
                  >
                    <h4 className="bg-white px-2 py-1 text-center text-lg font-medium min-w-52 rounded-sm hover:min-w-full uppercase transition-all duration-300 ease-in-out hover:cursor-pointer group">
                      <div className="group-hover:flex group-hover:text-red-500 justify-between">
                        <span>{category.title}</span>
                        <ChevronRight className="hidden group-hover:block" />
                      </div>
                    </h4>
                  </Link>
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
}

export default TrendingCategories;
