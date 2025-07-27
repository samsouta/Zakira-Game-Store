import { FeaturesSection } from "../components/features/home/FeaturesSection";
import { FloatingBanner } from "../components/features/home/FloatingBanner";
import { Hero } from "../components/features/home/Hero";
import { ProductGrid } from "../components/features/home/ProductGrid";

export const Home = () => {
  return (
    <div className="">
        <FloatingBanner />
        <Hero />
        <ProductGrid />
        <FeaturesSection />
        {/* <PromoBanner /> */}
    </div>
  );
};
