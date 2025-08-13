import { Button } from "@/components/ui/button";
import Image from "next/image";
import MainBanner from "./login/MainBanner";
import NewArrivals from "./_components/NewArrivals";

export default function Home() {
  return (
    <div>
      <MainBanner/>
      <NewArrivals/>
    </div>
  );
}
