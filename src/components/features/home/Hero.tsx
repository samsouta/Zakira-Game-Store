import { motion } from "framer-motion";
import { Star, Zap, BellDot, MessageCircle } from "lucide-react";

export const Hero = () => {
  return (
    <div 
    className="
    rounded-[32px] py-3 liquid-glass-nav
    relative overflow-hidden mb-10
    ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-yellow-300 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Floating Sale Badge */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg"
            >
              <BellDot className="inline w-4 h-4 mr-1 text-green-600" />
              Admin <span className=" oxanium text-green-500 ">Online</span> Now 
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg oxanium mb-3 leading-tight"
            >
              Zakari Game Store မှ 
              <span className="block text-yellow-300">ဝယ်ယူသူတွေရဲ့ <span className="oxanium text-yellow-400" >Review</span> ကို "see <span className="text-red-500 oxanium " >Comments</span> " ကို နှိပ်ပြီးဖတ်ရှုနိုင်ပါတယ်</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl mb-8 text-red-100"
            >
              အောက်က <span className="text-red-500 oxanium " >Comments</span> ကိုနိုပ်ပြီး <span className="oxanium text-yellow-400" >Review</span> တွေဝင်ရေးပေးသွားပါအုန်းနော်...
              <br />
              <span className="text-yellow-300 font-semibold">

              </span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Comments
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
              >
               See Review
              </motion.button>
            </motion.div>

            {/* Star Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center mt-6 space-x-2"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-300 text-yellow-300"
                  />
                ))}
              </div>
              <span className="text-red-100">4.9 <span className="text text-yellow-500 font-bold oxanium " >Rating</span> (12,847 <span className="text text-gray-500 oxanium " >User</span> )</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <img className=" w-full h-full object-fill object-center" src="https://ik.imagekit.io/deceuior6/PHOTO/_%E5%93%B2%E9%A3%8E%E5%A3%81%E7%BA%B8_%E6%80%A7%E6%84%9F-%E6%97%B6%E5%B0%9A-%E7%A9%BF%E6%90%AD%20(1).png?updatedAt=1750446696268" alt="" />
                </div>
              </div>
            </motion.div>

            
          </motion.div>
        </div>
      </div>

    </div>
  );
};
