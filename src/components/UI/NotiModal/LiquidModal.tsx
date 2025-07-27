import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import type { NotificationType } from '../../../types/notiModelType';
import { useNavigate } from 'react-router-dom';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: NotificationType;
    title: string;
    message: string;
    customIcon?: React.ReactNode;
    btnText : string;
    router?: string;
}

// Color configurations
const typeConfig = {
    success: {
        icon: CheckCircle,
        color: '#38bdf8', // sky-blue
        glowColor: 'rgba(56, 189, 248, 0.4)',
        bgGradient: 'from-sky-500/20 to-blue-500/20'
    },
    warning: {
        icon: AlertTriangle,
        color: '#facc15', // amber
        glowColor: 'rgba(250, 204, 21, 0.4)',
        bgGradient: 'from-amber-500/20 to-yellow-500/20'
    },
    info: {
        icon: Info,
        color: '#c084fc', // purple
        glowColor: 'rgba(192, 132, 252, 0.4)',
        bgGradient: 'from-purple-500/20 to-violet-500/20'
    },
    error: {
        icon: XCircle,
        color: '#f472b6', // rose-pink
        glowColor: 'rgba(244, 114, 182, 0.4)',
        bgGradient: 'from-pink-500/20 to-rose-500/20'
    }
};

export const LiquidModal = ({
    isOpen,
    onClose,
    type = 'info',
    title,
    message,
    customIcon,
    btnText,
    router
}: ModalProps) => {
    const config = typeConfig[type];
    const IconComponent = config.icon;
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        onClick={onClose}
                    >
                        {/* Blurred backdrop with gradient */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

                        {/* Animated background particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-sky-500/10 to-purple-500/10 blur-xl"
                            />
                            <motion.div
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    rotate: [360, 180, 0],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-r from-amber-500/10 to-pink-500/10 blur-xl"
                            />
                        </div>

                        {/* Modal */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: 50,
                                rotateX: -15
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                rotateX: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: 50,
                                rotateX: 15
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                duration: 0.6
                            }}
                            className="relative w-full max-w-sm sm:max-w-md mx-auto"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                perspective: '1000px'
                            }}
                        >
                            {/* Glow effect */}
                            <div
                                className="absolute inset-0 rounded-3xl blur-xl opacity-60"
                                style={{
                                    background: `radial-gradient(circle at center, ${config.glowColor} 0%, transparent 70%)`
                                }}
                            />

                            {/* Main glass container */}
                            <div className={`
                relative backdrop-blur-xl bg-white/10 
                border border-white/20 rounded-3xl p-6 sm:p-8
                shadow-2xl shadow-black/25
                bg-gradient-to-br ${config.bgGradient}
                before:absolute before:inset-0 before:rounded-3xl
                before:bg-gradient-to-br before:from-white/20 before:to-transparent
                before:opacity-50 before:pointer-events-none
                overflow-hidden
              `}>
                                {/* Animated border shimmer */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 360]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 rounded-3xl"
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent, ${config.color}40, transparent)`
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20,
                                                delay: 0.2
                                            }}
                                            className="flex-shrink-0 mr-3"
                                        >
                                            <div
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30"
                                                style={{
                                                    background: `linear-gradient(135deg, ${config.color}20, ${config.color}40)`,
                                                    boxShadow: `0 8px 32px ${config.glowColor}`
                                                }}
                                            >
                                                {customIcon || (
                                                    <IconComponent
                                                        className="w-6 h-6 sm:w-7 sm:h-7"
                                                        style={{ color: config.color }}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Close button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={onClose}
                                            className="flex-shrink-0 w-8 h-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    </div>

                                    {/* Title */}
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight"
                                    >
                                        {title}
                                    </motion.h3>

                                    {/* Message */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="text-white/80 text-sm sm:text-base leading-relaxed mb-6"
                                    >
                                        {message}
                                    </motion.p>

                                    {/* Action button */}
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            onClose();
                                            if (router) {
                                                navigate(router);
                                            }
                                        }}
                                        className="w-full py-3 px-4 rounded-2xl font-semibold text-white backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${config.color}40, ${config.color}60)`,
                                            boxShadow: `0 4px 20px ${config.glowColor}`
                                        }}
                                    >
                                        {btnText}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
