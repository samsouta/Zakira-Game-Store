import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const FloatingBanner = () => {
  return (
    <div className=" absolute top-24 sm:top-20 md:top-20 left-0 right-0 z-20 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
        className="flex items-center justify-start whitespace-nowrap"
      >
        <div className="flex items-center space-x-2 sm:space-x-4 bg-[var(--sky-blue)] rounded-lg sm:rounded-xl shadow-lg px-3 py-2 sm:px-4 sm:py-3 mx-4 relative min-w-max">
          {/* Bell Icon */}
          <motion.div
            animate={{
              rotate: [-10, 10, -10, 10, -5, 5, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="flex-shrink-0"
          >
            <motion.div
              
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-700 drop-shadow-md" />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.span
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-bold text-xs sm:text-sm md:text-base text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)] drop-shadow-md"
          >
            Zakari Game Store ကို လာရောက်အားပေးတဲ့လူအကုန်လုံးကိုအထူးကျေးဇူးတင်ပါတယ်ဗျာ
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};