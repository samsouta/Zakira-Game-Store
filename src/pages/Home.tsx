import { FeaturesSection } from "../components/features/home/FeaturesSection";
import { FloatingBanner } from "../components/features/home/FloatingBanner";
import { Hero } from "../components/features/home/Hero";
import { ProductGrid } from "../components/features/home/ProductGrid";
import { PromoBanner } from "../components/features/home/PromoBanner";
import { Footer } from "../components/layout/Footer";

export const Home = () => {
  return (
    <div className=" mx-4">
        {/* <FloatingBanner /> */}
        <Hero />
        <ProductGrid />
        <FeaturesSection />
        <PromoBanner />
        {/* <Footer /> */}
    </div>
  );
};
