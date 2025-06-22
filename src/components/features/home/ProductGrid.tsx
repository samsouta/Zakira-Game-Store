import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";

const products = [
  {
    name: "旗舰智能手机 Pro Max",
    price: 4999,
    originalPrice: 5999,
    rating: 5,
    reviews: 2847,
    image: "📱",
    badge: "热销",
  },
  {
    name: "无线蓝牙耳机 Ultra",
    price: 899,
    originalPrice: 1299,
    rating: 5,
    reviews: 1523,
    image: "🎧",
    badge: "新品",
  },
  {
    name: "智能手表 Series X",
    price: 1999,
    originalPrice: 2499,
    rating: 4,
    reviews: 984,
    image: "⌚",
    badge: "限时",
  },
  {
    name: "游戏手柄 Pro",
    price: 699,
    originalPrice: 899,
    rating: 5,
    reviews: 756,
    image: "🎮",
  },
  {
    name: "快充充电器 120W",
    price: 299,
    originalPrice: 399,
    rating: 4,
    reviews: 1247,
    image: "🔌",
    badge: "推荐",
  },
  {
    name: "无线充电板",
    price: 199,
    originalPrice: 299,
    rating: 4,
    reviews: 623,
    image: "📶",
  },
];

export const ProductGrid = () => {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              အခုဝယ် အခုရ 
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              查看更多产品
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
