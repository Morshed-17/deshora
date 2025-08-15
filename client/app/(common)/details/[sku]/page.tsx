"use client";

import { useGetSingleProductBySkuQuery } from "@/redux/features/product/productApi";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import { IProduct } from "@/types/type";
import Container from "@/components/ui/Container";
import Link from "next/link";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0); // for active thumbnail border
  const { sku } = useParams<{ sku: string }>();
  const { data, isLoading, error } = useGetSingleProductBySkuQuery(sku);

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Failed to load product.</p>;

  const product = data?.data as IProduct;

  return (
    <div>
      <Container>
        <Link href={"/"} className="text-accent-foreground font-medium ">
          Home
        </Link>
      </Container>

      <Container className="flex flex-col lg:flex-row gap-8  mx-auto mt-4">
        {/* Left: Image Gallery */}
        <div className="flex gap-4 flex-1">
          {/* Thumbnail list */}
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper "
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {product.galleryImages.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer  !h-auto">
                <img
                  src={image}
                  className={`max-w-full max-h-20 sm:max-h-28 md:max-h-32 object-contain  ${
                    activeIndex === index
                      ? "border-[#0000005b] border p-1"
                      : "p-1"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Main Image */}

          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className=" w-full  lg:w-[550px]"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {product.galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <InnerImageZoom
                  src={image}
                  zoomType="hover"
                  className="!block border border-gray-200"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-4  flex-1">
          <h1 className="text-lg md:text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          <p className="text-xl md:text-3xl font-bold">৳ {product.price}</p>

          <p>
            <span className="font-semibold">Color:</span> {product.color}
          </p>

          <div className="flex items-center">
            <span className="font-semibold">Size: </span>{" "}
            <div className="px-3 py-1 rounded flex flex-wrap gap-2">
              {product.sizesAvailable?.length > 0 &&
                product.sizesAvailable?.map((item, index) =>
                  item.stock === 0 ? (
                    <Button
                      onClick={() => toast.error("Size out of stock 🥲")}
                      className="bg-primary"
                      key={index}
                    >
                      {item.size}
                    </Button>
                  ) : (
                    <Button variant={"outline"} key={index}>
                      {item.size}
                    </Button>
                  )
                )}
            </div>
          </div>

          <button className="bg-black text-white px-6 py-3 mt-4 hover:bg-gray-800">
            ADD TO BAG
          </button>

          <div className="mt-6">
            <details>
              <summary className="font-semibold">Details</summary>
              <p className="mt-2 text-gray-600">
                {product.description || "N/A"}
              </p>
            </details>
          </div>
        </div>
      </Container>
    </div>
  );
}
