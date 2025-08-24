import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export const FloatingBanner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden pointer-events-none h-20 sm:h-24 md:h-32 lg:h-40 flex items-center justify-center">
      {/* Main Cinematic Scene */}
      <motion.div
        // initial={{ x: "60%" }}
        // animate={{ x: "-120%" }}
        // transition={{
        //   duration: 30,
        //   ease: "linear",
        //   repeatType: "loop"
        // }}
        className="flex items-center h-full relative"
      >
        <div className="flex items-center mx-4 sm:mx-8 relative min-w-max">

          {/* Epic Hero Section */}
          <motion.div
            className="relative mr-6 sm:mr-12 group"
            whileHover={{ scale: 1.02 }}
          >
            {/* Multi-layered energy aura */}
            <motion.div
              className="absolute -inset-4 sm:-inset-8 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4)',
                filter: 'blur(15px)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.3, 0.8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity },
                opacity: { duration: 3, repeat: Infinity },
              }}
            />

            {/* Secondary energy ring */}
            <motion.div
              className="absolute -inset-6 sm:-inset-10 rounded-full border-2 border-cyan-400/30"
              animate={{
                rotate: [360, 0],
                scale: [1.2, 0.9, 1.2],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity },
              }}
            />

            {/* Enhanced Hero Figure */}
            

            {/* Enhanced Plasma Sword */}
            <motion.div
              className="absolute -right-1 sm:-right-3 top-1/2 transform -translate-y-1/2"
              animate={{
                rotate: [0, 15, -8, 20, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4, repeat: Infinity },
              }}
            >
              {/* Sword handle with details */}
              <div className="relative w-0.5 sm:w-1 h-4 sm:h-8 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700 rounded-full">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-0.5 sm:h-1 bg-cyan-400 rounded-full" />
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-0.5 sm:h-1 bg-red-400 rounded-full" />
              </div>

              {/* Multi-layered plasma blade */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-8 sm:h-16 rounded-full"
                style={{
                  background: 'linear-gradient(to top, #06b6d4, #3b82f6, #8b5cf6, #ffffff)',
                }}
                animate={{
                  height: [32, 68, 32],
                  opacity: [0.9, 1, 0.9],
                  boxShadow: [
                    '0 0 15px rgba(6, 182, 212, 1), 0 0 30px rgba(59, 130, 246, 0.8)',
                    '0 0 25px rgba(6, 182, 212, 1), 0 0 50px rgba(59, 130, 246, 1)',
                    '0 0 15px rgba(6, 182, 212, 1), 0 0 30px rgba(59, 130, 246, 0.8)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Blade core glow */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-8 sm:h-16 bg-white/60 rounded-full blur-sm"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  height: [32, 68, 32],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Energy crackles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${-2 + Math.random() * 8}px`,
                    top: `${Math.random() * 60}px`,
                  }}
                  animate={{
                    x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
                    y: [0, -Math.random() * 20],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            {/* Enhanced combat effects */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}px`,
                  top: `${10 + Math.random() * 60}px`,
                  background: ['#fbbf24', '#f59e0b', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 4)],
                }}
                animate={{
                  x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80],
                  y: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60],
                  opacity: [1, 0],
                  scale: [1.2, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.3 + Math.random() * 2,
                }}
              />
            ))}

            {/* Force waves */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/30"
              animate={{
                scale: [1, 3],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.div>

          {/* Enhanced Space Battleships Fleet */}
          <div className="relative mr-8 sm:mr-16">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${i * 40}px`,
                  top: `${-15 + i * 12}px`,
                }}
                animate={{
                  x: [0, 120, 0],
                  y: [0, -30 + Math.sin(i) * 10, 0],
                  rotateZ: [0, 12, 0],
                }}
                transition={{
                  duration: 8 + i * 1.5,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }}
              >
                {/* Ship body with more details */}
                <div className="relative w-6 sm:w-10 h-1.5 sm:h-2 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600 rounded-full">
                  {/* Ship wings */}
                  <div className="absolute top-0 left-2 w-2 sm:w-3 h-0.5 bg-slate-400 rounded-full transform -rotate-12" />
                  <div className="absolute bottom-0 left-2 w-2 sm:w-3 h-0.5 bg-slate-400 rounded-full transform rotate-12" />

                  {/* Enhanced engine glow */}
                  <motion.div
                    className="absolute -left-2 sm:-left-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-1 sm:h-1.5 bg-gradient-to-l from-orange-400 via-red-500 to-purple-600 rounded-full blur-sm"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      scale: [0.9, 1.3, 0.9],
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                    }}
                  />

                  {/* Ship lights */}
                  <div className="absolute right-0.5 top-0 w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                  <div className="absolute right-0.5 bottom-0 w-0.5 h-0.5 bg-red-400 rounded-full" />
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-green-400 rounded-full" />

                  {/* Energy shield */}
                  <motion.div
                    className="absolute -inset-1 border border-cyan-400/40 rounded-full"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </div>

                {/* Laser beams */}
                <motion.div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 sm:w-12 h-0.5 bg-gradient-to-r from-red-500 to-transparent rounded-full"
                  animate={{
                    opacity: [0, 1, 0],
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 2 + Math.random() * 3,
                  }}
                />
              </motion.div>
            ))}

            {/* Battle explosions */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 sm:w-6 h-4 sm:h-6 rounded-full"
                style={{
                  left: `${50 + i * 60}px`,
                  top: `${10 + i * 20}px`,
                  background: 'radial-gradient(circle, #fbbf24, #f59e0b, #dc2626)',
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 3 + i * 2,
                }}
              />
            ))}
          </div>

          {/* Epic Typography Section */}
          <motion.div
            className="relative"
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Multiple glow layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-400/50 to-yellow-400/40 blur-xl rounded-3xl"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-400/40 to-pink-400/30 blur-lg rounded-2xl"
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />

            {/* Main title with enhanced styling */}
            <motion.h1
              className="relative text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-wider z-10 px-4 sm:px-8 py-2 sm:py-4"
              style={{
                fontFamily: '"Orbitron", "SF Pro Display", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #92400e, #fbbf24)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 40px rgba(251, 191, 36, 0.7), 0 0 80px rgba(251, 191, 36, 0.4)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ZAKARI GAME STORE
            </motion.h1>

            {/* Enhanced subtitle */}
            <motion.p
              className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-cyan-300 whitespace-nowrap tracking-wide px-2"
              style={{
                textShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                backdropFilter: 'blur(4px)',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(203, 213, 225, 0.2)'
              }}
              animate={{
                opacity: [0.8, 1, 0.8],
                y: [0, -2, 0],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              လားရောက်အားပေးတဲ့လူအကုန်လုံးကိုအထူးကျေးဇူးတင်ပါတယ်ဗျာ
            </motion.p>

            {/* Advanced holographic effects */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(6, 182, 212, 0.1) 1px, rgba(6, 182, 212, 0.1) 3px)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Data streams */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                style={{
                  left: `${10 + i * 12}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Enhanced Notification System */}
          <motion.div
            className="relative ml-4 sm:ml-8"
            animate={{
              rotate: [-8, 8, -8, 8, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              rotate: { duration: 0.6, repeat: Infinity, repeatDelay: 5 },
              scale: { duration: 3, repeat: Infinity },
            }}
          >
            {/* Multi-ring energy field */}
            <motion.div
              className="absolute inset-0 bg-cyan-400/40 rounded-full blur-lg"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="absolute inset-0 border-2 border-cyan-400/60 rounded-full"
              animate={{
                scale: [1, 3],
                opacity: [0.8, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-300 relative z-10" />

            {/* Pulse indicators */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-cyan-400/30 rounded-full"
                animate={{
                  scale: [1, 2 + i * 0.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Cinematic Lighting - Subtle overlay only */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0%, rgba(139, 92, 246, 0.03) 25%, rgba(236, 72, 153, 0.03) 50%, rgba(245, 158, 11, 0.03) 75%, rgba(6, 182, 212, 0.03) 100%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};