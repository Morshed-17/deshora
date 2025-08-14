import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"}>
      <div className="relative w-18 h-14 md:w-24 md:h-20 lg:w-28 lg:h-20">
        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
}

export default Logo;
