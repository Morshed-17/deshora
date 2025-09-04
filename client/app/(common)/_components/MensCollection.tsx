import React from "react";

import Image from "next/image";
import Banner from "@/public/images/mens-banner.webp";
import Link from "next/link";
function MensCollection() {
  return (
    <Link
      href={"/shop?category=panjabi%2Cshirt%2Cpolo"}
      className="grid grid-cols-1 lg:grid-cols-2 items-center mt-12 "
    >
      <div className="w-full h-full flex items-center  bg-secondary p-6">
        <div className=" max-w-[600px]">
          <h2 className="text-2xl md:text-4xl font-bold text-background">
            Redefining Modern Elegance A Curated Selection for Him
          </h2>
          <p className="text-background/70 text-lg mt-4">
            Discover timeless silhouettes, sharp tailoring, and elevated
            essentials — designed for the modern man.
          </p>
        </div>
      </div>
      <Image
        src={Banner}
        alt="mens banner"
        className="h-full w-full object-contain"
      />
    </Link>
  );
}

export default MensCollection;
