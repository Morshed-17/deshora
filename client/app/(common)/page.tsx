import MainBanner from "./_components/MainBanner";
import MensCollection from "./_components/MensCollection";
import NewArrivals from "./_components/NewArrivals";
import SummerCollection from "./_components/SummerCollection";

import TrendingCategories from "./_components/TrendingCategories";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <TrendingCategories />
      <NewArrivals />
      <MensCollection />
      <SummerCollection/>
    </div>
  );
}
