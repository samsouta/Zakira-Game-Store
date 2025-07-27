import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Loading } from "../../UI/Loading";
import { liquidGlassClasses } from "../../../style/LiquidGlass";
import { useGetGamesTypeQuery } from "../../../services/API/productsAPI";

export const ProductGrid = () => {
  const { data, isLoading, error } = useGetGamesTypeQuery();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    );
  }

  // Handle empty products state
  if (!data?.data || data?.data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className={` px-2`}>
      <section 
      className={`py-20 w-full h-auto rounded-[32px] liquid-glass-nav overflow-hidden text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)] ${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText}
      `}>
        <div className=" px-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl oxanium font-black  mb-6">
              Available Our Store 
            </h2>
            <p className="text-x opacity-60 font-medium  max-w-3xl mx-auto">
              အခုပဲ Buy Now ကို နိုပ်လိုက်ပါ  🔥
            </p>
          </motion.div>

          <div className=" grid grid-cols-3  lg:grid-cols-6 gap-3 justify-center ">
            {data?.data.map((item) => (
              <ProductCard key={item?.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
