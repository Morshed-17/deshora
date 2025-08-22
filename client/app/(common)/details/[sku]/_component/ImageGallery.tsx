import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IProduct } from "@/types/type";
import InnerImageZoom from "react-inner-image-zoom";
function ImageGallery({ product }: { product: IProduct }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
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
    </div>
  );
}

export default ImageGallery;
