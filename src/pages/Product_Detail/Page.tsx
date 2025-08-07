/**
 * Product Detail Page Component
 * 
 * This component displays a list of products (both accounts and coins) with filtering capabilities,
 * animations, and responsive layout. It includes features like pagination and a preview modal.
 */

import { motion } from 'framer-motion';
import PaginationDemo from '../../components/UI/PaginationDemo';
import { useSearchParams } from 'react-router-dom';
import AccountProductCard, { DiamondProductCard } from '../../components/features/ProductDetails/ProductCard';
import { useGetProductsQuery } from '../../services/API/productsAPI';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';
import { useState } from 'react';
import { liquidGlassClasses } from '../../style/LiquidGlass';
import { Loading } from '../../components/UI/Loading';
import TopUpForm from '../../components/UI/TopUpForm';
import PageMeta from '../../components/common/PageMeta';

// Animation variants for the main container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

// Animation variants for the title section
const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Page = () => {
  // URL parameters and state management
  const [page] = useSearchParams();
  const [isPreview, setIsPreview] = useState(false);

  // Redux selectors for service and game information
  const serviceId = useSelector((state: RootState) => state?.services?.serviceId);
  const serviceName = useSelector((state: RootState) => state?.services?.serviceName);
  const serviceDesc = useSelector((state: RootState) => state?.services?.description);
  const productType = useSelector((state: RootState) => state?.services?.productType);

  // Fetch products data with pagination and service filtering
  const { data: productsData, isLoading: isProductsLoading, error: productsError } = useGetProductsQuery({
    page: Number(page.get('page')) || 1,
    service_id: serviceId || 0,
    product_type: productType || ''
  });

  // // Filter products based on service and game IDs
  // const filteredProducts = productsData?.data?.data?.filter(
  //   product => (!serviceId || product?.service_id === serviceId) && 
  //              (!gameId || product?.game_id === gameId)
  // );

  // Loading, error, and empty state handlers
  if (isProductsLoading) {
    return <Loading />;
  }

  if (productsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{(productsError)?.toString()}</p>
        </div>
      </div>
    );
  }

  if (!productsData?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Zakari - Product Detail"
        description="Zakari is a game store that sells games and products"
      />

      {/* Main container with liquid glass effect */}
      <div className={`mx-2 overflow-hidden ${liquidGlassClasses?.liquidText}`}>
        <div className="absolute inset-0 pointer-events-none" />

        {/* Animated content container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Title section with animated gradient */}
          <motion.div
            variants={titleVariants}
            className={`text-center mb-16 ${liquidGlassClasses?.base} p-6 rounded-3xl`}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold oxanium text-transparent bg-clip-text mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {serviceName?.replace(/-/g, ' ').replace(/^./, str => str.toUpperCase())}
            </motion.h1>
            <motion.p
              className="text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {serviceDesc}
            </motion.p>
          </motion.div>

          {/* Products display section */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div>
              {/* Account products grid - Responsive layout */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {productsData?.data?.data
                  ?.filter(product => product.product_type === "account")
                  ?.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      className="w-full h-full"
                    >
                      <AccountProductCard pkg={product} />
                    </motion.div>
                  ))}
              </div>

              {/* Coin products grid - Responsive layout */}
              <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6`}>
                {productsData?.data?.data
                  ?.filter(product => product.product_type === "coin")
                  ?.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      className="w-full h-full"
                    >
                      <DiamondProductCard onOpen={() => setIsPreview(true)} pkg={product} />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* No products found message */}
            {(!productsData?.data?.data || productsData?.data?.data.length === 0) && (
              <div className={`flex flex-col items-center justify-center py-12 rounded-3xl sm:py-16 lg:py-20 ${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText}`}>
                <div className="text-center max-w-md mx-auto px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 opacity-50">🔍</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-sm sm:text-base opacity-60">No products match your current selection.</p>
                </div>
              </div>
            )}
          </div>

          {/* Features footer with animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-3 sm:gap-6 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 sm:px-8 py-4 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold">24/7 Support</span>
              </div>
              <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-blue-400">
                <span className="text-xs sm:text-sm font-semibold">🛡️ Secure Transfer</span>
              </div>
              <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="text-xs sm:text-sm font-semibold">⚡ Instant Delivery</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pagination section */}
        <div className="bg-white/30 backdrop-blur-xl mt-10 mb-5 rounded-3xl border border-white/40 p-4 sm:p-8 lg:p-12 shadow-2xl shadow-black/10">
          <PaginationDemo
            current_Page={productsData?.data?.current_page || 1}
            total_Pages={productsData?.data?.last_page || 1}
          />
        </div>
      </div>

      {/* Preview modal */}
      {isPreview && (
        <div className="h-screen w-full">
          <TopUpForm onClose={() => setIsPreview(false)} />
        </div>
      )}
    </>
  );
};