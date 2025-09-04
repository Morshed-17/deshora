import { IProduct } from "@/types/type";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  product: IProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const { _id, title, price, galleryImages, sku } = product;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/details/${sku}`)}
      className="cursor-pointer"
    >
      <AspectRatio
        ratio={369 / 461}
        className="group relative overflow-hidden "
      >
        {/* Default Image */}

        {galleryImages.length > 1 ? (
          <>
            <Image
              fill
              src={galleryImages[0]}
              alt="default"
              className="w-full h-full object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
            />
            <Image
              src={galleryImages[1]}
              alt="hover"
              fill
              className="absolute top-0 left-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            />{" "}
          </>
        ) : (
          <Image
            src={galleryImages[0]}
            alt="default"
            fill
            className="w-full h-full object-contain "
          />
        )}
      </AspectRatio>
      <h3 className="text-sm md:text-base font-medium text-accent-foreground mt-2 md:mt-3 lg:mt-4 truncate">
        {title}
      </h3>
      <p className="text-sm md:text-base font-medium flex gap-1 ">
        <span>Tk</span>
        <span>{price}</span>
      </p>
    </div>
  );
}

export default ProductCard;
