import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const FloatingBanner = () => {
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className=" absolute top-24 left-36 right-0 z-20  text-white"
      >
        <div
          className="
        flex items-center justify-center space-x-4  whitespace-nowrap
        "
        >
          <div
          className="
          bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-xl shadow-lg relative
          font-bold text-xs w-auto p-3 flex items-center justify-center text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)]
    "
          >
            <motion.div
              animate={{
                rotate: [-10, 10, -10, 10, -5, 5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }}
              className="absolute bottom-6 left-1"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Bell className="w-7 h-7 mr-2 text-red-700 drop-shadow-md" />
              </motion.div>
            </motion.div>

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
            >
              Zakari Game Store ကို
              လာရောက်အားပေးတဲ့လူအကုန်လုံးကိုအထူးကျေးဇူးတင်ပါတယ်ဗျာ
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
