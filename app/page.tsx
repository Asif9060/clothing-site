import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { NewDropsStrip } from "@/components/home/NewDropsStrip";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { ShowByCategory } from "@/components/home/ShowByCategory";
import { BrandStory } from "@/components/home/BrandStory";
import { LookbookBanner } from "@/components/home/LookbookBanner";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryTabs />
      <NewDropsStrip />
      <RecentlyViewed />
      <LookbookBanner />
      <ShowByCategory />
      <BrandStory />
      <Newsletter />
    </>
  );
}
