import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"}>
      <Image src={"/logo.svg"} width={110} height={100} alt="Logo" />
    </Link>
  );
}

export default Logo;
