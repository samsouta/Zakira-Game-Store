import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Parallax } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/parallax';

import { useDispatch } from 'react-redux';
import { setOrder } from '../../services/Slice/orderSlice';

interface PreviewSlidePropt {
  orderDetail: {
    orderId: string;
    orderType: string;
    service_id: number;
    image: string;
    title: string;
    totalPrice: number;
    game_uid: string;
    game_server: string;
  };
  isOpen: boolean;
  thumbnails: string[];
  title: string;
  onClose: () => void;
}

export const PreviewSlide = ({
  orderDetail,
  isOpen,
  title,
  thumbnails,
  onClose
}: PreviewSlidePropt) => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const BuyNow = () => {
    try {
      dispatch(setOrder(orderDetail));
      router('/order');
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error('Failed to set order ID:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-full sm:h-[90vh] mx-auto px-4 py-6 mt-36 sm:mt-28 overflow-y-auto"

          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-20 sm:top-10 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Title */}
            <div className="text-center mt-12 sm:mt-8">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
              >
                {title} 🏆
              </motion.h1>
            </div>

            {/* Swiper */}
            <div className="relative w-full sm:px-6">
              <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                speed={600}
                parallax
                modules={[EffectCoverflow, Parallax]}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1.8,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                  },
                }}
                className="w-full"
              >
                {thumbnails?.map((slide, index) => (
                  <SwiperSlide key={index} className="p-2">
                    <div className="relative group rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={slide}
                        alt="product"
                        className="w-full h-full object-fill object-center transition-transform duration-500 group-hover:scale-105 rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={BuyNow}
              className="w-full max-w-md mx-auto mt-8 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Buy Now
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
