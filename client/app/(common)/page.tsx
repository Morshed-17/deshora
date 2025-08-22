import { Button } from "@/components/ui/button";
import Image from "next/image";
import MainBanner from "./login/MainBanner";
import NewArrivals from "./_components/NewArrivals";
import LogoutButtonHeader from "@/components/common/Header/TopHeader/LogoutButtonHeader";
import TrendingCategories from "./_components/TrendingCategories";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <TrendingCategories />
      <NewArrivals />
    </div>
  );
}
