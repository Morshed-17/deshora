"use client";

import { useGetSingleProductBySkuQuery } from "@/redux/features/product/productApi";
import { useParams } from "next/navigation";

import { useState } from "react";
import { IProduct } from "@/types/type";
import Container from "@/components/ui/Container";
import Link from "next/link";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "react-inner-image-zoom/lib/styles.min.css";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import ImageGallery from "./_component/ImageGallery";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import DeliveryReturnPopup from "./_component/DeliveryAndReturnPopup";
import SizeGuidePopup from "./_component/SizeGuidePopup";
import { useAppDispatch } from "@/redux/hooks";
import { addtoCart, clearCart } from "@/redux/features/cart/cartSlice";

export default function ProductDetailsPage() {
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const { sku } = useParams<{ sku: string }>();
  const { data, isLoading, error } = useGetSingleProductBySkuQuery(sku);

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Failed to load product.</p>;

  const product = data?.data as IProduct;

  const handleAddToCart = () => {
    const quantity = 1;
    const size = selectedSize;

    if (product.hasSizes && !selectedSize.length) {
      return toast.error("Please Select Size, Before adding to Bag !");
    }

    dispatch(
      addtoCart({
        _id: product._id,
        price: product.price,
        title: product.title,
        sku: product.sku,
        color: product.color,
        image: product.galleryImages[0],
        quantity,
        size,
      })
    );
    // dispatch(clearCart())
  };

  return (
    <div>
      <Container>
        <Link href={"/"} className="text-accent-foreground font-medium ">
          Home
        </Link>
      </Container>

      <Container className="flex flex-col lg:flex-row gap-8  mx-auto mt-4">
        {/* Left: Image Gallery */}
        <ImageGallery product={product} />

        {/* Right: Product Info */}
        <div className="flex flex-col  gap-3  flex-1">
          <h1 className="text-lg md:text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-accent-foreground/60 font-medium">
            SKU: {product.sku}{" "}
          </p>
          <p className="text-xl md:text-3xl font-semibold text-muted-foreground">
            ৳ {product.price}
          </p>

          <p className="capitalize text-xl font-semibold text-muted-foreground border-y border-primary/40 py-2 border-dashed ">
            Color: <span className=" ">{product.color}</span>
          </p>

          <div className="flex items-baseline">
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
                    <Button
                      variant={"outline"}
                      key={index}
                      onClick={() => setSelectedSize(item.size)}
                      className={cn(
                        "hover:bg-foreground hover:text-white",
                        selectedSize === item.size &&
                          "bg-foreground text-white hoverEffect"
                      )}
                    >
                      {item.size}
                    </Button>
                  )
                )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="text-sm md:text-base hover:bg-primary text-white font-medium hoverEffect px-6 py-3 mt-4 bg-gray-800 rounded-xs flex items-center gap-2"
            >
              ADD TO BAG
              <ShoppingBag size={14} />
            </button>
            <button className="text-sm md:text-base bg-primary text-white font-medium hoverEffect px-6 py-3 mt-4 hover:bg-gray-800 rounded-xs ">
              BUY NOW
            </button>
          </div>
          <div className="flex gap-6">
            <DeliveryReturnPopup />
            <SizeGuidePopup />
          </div>

          <div className="mt-6">
            <details
              className="w-full border border-gray-200 cursor-pointer hoverEffect p-3 select-none"
              open
            >
              <summary className="font-semibold ">Details</summary>
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
