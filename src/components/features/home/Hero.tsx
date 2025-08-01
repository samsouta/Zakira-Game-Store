import { motion } from "framer-motion";
import { Star, BellDot, MessageCircle } from "lucide-react";
import { CommentModal } from "./CommentModal";
import { ReviewModal } from "./ReviewModal";
import { useState } from "react";
import { liquidGlassClasses } from "../../../style/LiquidGlass";
import { useAuth } from "../../../hook/useAuth";
import { LiquidModal } from "../../UI/NotiModal/LiquidModal";
import type { NotificationType } from "../../../types/notiModelType";

const demos = [
  {
    type: 'error' as const,
    title: 'Login you Account',
    message: ` comment ဖို့ အရင် login ဖို့ လိုပါတယ် , အကာက်မရှိရင် အကောက်အရင်လုပ်ပေးပါ.`,
    btnText: 'Login / အကောက်ဝင်မည်',
    buttonClass: 'from-pink-500 to-rose-600 shadow-pink-500/25',
    router: '/login'
  }
];


export const Hero = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const { isAuthenticated } = useAuth();


  /**
   * @function Handle Comment Modal 
   */

  const handleCommentModal = () => {
    if (isAuthenticated) {
      setIsCommentModalOpen(true)
    } else {
      setActiveModal('error')
    }
  }

  return (
    <>
      <div
        className={` rounded-[32px] relative overflow-hidden mb-10 mx-1`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-[var(--sky-blue)] rounded-full opacity-20"
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

        <div className="relative z-10 w-full mx-auto px-2 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)] p-4 md:p-6 rounded-3xl ${liquidGlassClasses?.base}
    md:col-span-7 md:order-1
    `}
            >
              {/* Floating Sale Badge */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block bg-[var(--amber)] px-3 py-2 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm mb-4 md:mb-6 shadow-lg"
              >
                <BellDot className="inline w-5 h-5 md:w-7 md:h-7 mr-1 text-green-600" />
                Admin{" "}
                <span className="oxanium text-green-500 text-lg md:text-xl">
                  Online
                </span>{" "}
                Now
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base lg:text-lg oxanium mb-3 leading-tight"
              >
                📢 Zakari Game Store မှ ဝယ်ယူသူတွေရဲ့ မှတ်ချက်ကို<br className="hidden md:block" />
                <span className="text-red-500 text-lg md:text-2xl">See Reviews</span> " ကို
                နှိပ်ပြီးဖတ်ရှုနိုင်ပါတယ်
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-base lg:text-lg mb-6 md:mb-8"
              >
                🗣️ အောက်က{" "}
                <span className="text-red-500 oxanium text-lg md:text-2xl">Comments</span>{" "}
                ကိုနိုပ်ပြီး မှတ်ချက် တွေဝင်ရေးပေးသွားပါအုန်းနော်...
                <br />
                <span className="text-yellow-300 font-semibold"></span>
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCommentModal}
                  className="bg-yellow-400 text-red-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:bg-yellow-300 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Comments
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsReviewModalOpen(true)}
                  className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-red-600 transition-colors w-full sm:w-auto"
                >
                  See Review
                </motion.button>
              </motion.div>

              {/* Star Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row sm:items-center mt-4 md:mt-6 space-y-2 sm:space-y-0 sm:space-x-2 justify-center md:justify-start"
              >
                <div className="flex space-x-1 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 fill-yellow-300 text-yellow-300"
                    />
                  ))}
                </div>
                <span className="text-sm md:text-base text-center md:text-left">
                  4.9{" "}
                  <span className="text-yellow-500 font-bold oxanium">
                    Rating
                  </span>{" "}
                  (10,847{" "}
                  <span className=" text-[var(--purple)] oxanium font-bold">User</span>)
                </span>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Image */}
            <div className="md:col-span-5 md:order-2">
              <div className="w-full max-w-sm md:max-w-md lg:w-96 lg:h-96 mx-auto overflow-hidden rounded-3xl aspect-square">
                <img
                  className="w-full h-full object-cover object-center"
                  src="https://i.pinimg.com/736x/f5/e7/8c/f5e78ce820654f0f6101469b0a66ff19.jpg"
                  alt="Game Store Product"
                />
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Modals --------------------- */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
      />

      {
        demos?.map((demo) => (
          <LiquidModal
            key={demo.type}
            isOpen={activeModal === demo.type}
            onClose={() => setActiveModal(null)}
            type={demo.type}
            title={demo.title}
            message={demo.message}
            btnText={demo?.btnText}
            router={demo?.router}
          />
        ))
      }

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </>
  );
};
