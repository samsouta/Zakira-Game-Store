import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Clock, Gift, Zap } from 'lucide-react';


export const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white opacity-10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Gift className="w-16 h-16 mx-auto text-yellow-300" />
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            限时闪购活动
          </h2>
          
          <p className="text-xl lg:text-2xl mb-8 text-purple-100">
            全场商品限时8折，错过再等一年！
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="text-center">
              <div className="bg-white text-purple-600 w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center font-black text-xl lg:text-2xl">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-purple-200 text-sm mt-2">小时</div>
            </div>
            <Clock className="w-6 h-6 text-yellow-300" />
            <div className="text-center">
              <div className="bg-white text-purple-600 w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center font-black text-xl lg:text-2xl">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-purple-200 text-sm mt-2">分钟</div>
            </div>
            <Clock className="w-6 h-6 text-yellow-300" />
            <div className="text-center">
              <div className="bg-white text-purple-600 w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center font-black text-xl lg:text-2xl">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-purple-200 text-sm mt-2">秒</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 transition-colors flex items-center justify-center"
            >
              <Zap className="mr-2 w-5 h-5" />
              立即抢购
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              查看详情
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
