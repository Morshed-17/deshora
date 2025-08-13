import Taka from "@/components/ui/taka";
import { IProduct } from "@/types/type";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        {/* Default image */}
        <Image
          src={galleryImages[0]}
          alt={`${title} default`}
          fill
          priority
          className="object-cover absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />

        {/* Hover image */}
        {galleryImages[1] && (
          <Image
            src={galleryImages[1]}
            alt={`${title} hover`}
            fill
            priority
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
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
