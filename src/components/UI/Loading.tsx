import { motion } from 'framer-motion'

export const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <motion.div className="relative w-24 h-24">
                {/* Outer spinning ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/80 border-r-white/80"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        filter: "blur(1px)",
                    }}
                />
                
                {/* Inner spinning ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-t-white/60 border-r-white/60"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        filter: "blur(1px)",
                    }}
                />
                
                {/* Center glow effect */}
                <div className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-md" 
                    style={{
                        boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.3)",
                    }}
                />
            </motion.div>
        </div>
    )
}
