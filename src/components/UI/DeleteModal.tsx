import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isDark?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Message",
  message = "Are you sure you want to delete this message? This action cannot be undone.",
  isDark = false
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.7,
      opacity: 0,
      y: 50,
      rotateX: -15
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      scale: 0.8,
      opacity: 0,
      y: 30,
      rotateX: 10,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.1
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    tap: { 
      scale: 0.98,
      y: 0,
      transition: { duration: 0.1 }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={isDark ? 'dark' : ''}>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                relative w-full max-w-md mx-auto rounded-2xl shadow-2xl
                glass-light dark:glass-dark
                ${isDark ? 'dark' : ''}
              `}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-button-light dark:glass-button-dark hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                <X size={18} className="text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Warning Icon */}
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-pink to-purple/80 shadow-lg"
                  style={{ color: 'var(--rose-pink)' }}
                >
                  <AlertTriangle size={28} className="text-white drop-shadow-sm" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-4"
                >
                  {title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center text-gray-600 dark:text-gray-300 mb-8 leading-relaxed px-2"
                >
                  {message}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  {/* Cancel Button */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 sm:py-3.5 font-medium text-gray-700 dark:text-gray-300 rounded-xl glass-button-light dark:glass-button-dark hover:bg-white/40 dark:hover:bg-gray-600/60 transition-all duration-200 shadow-md"
                  >
                    Cancel
                  </motion.button>

                  {/* Delete Button */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={onConfirm}
                    className="flex-1 px-6 py-3 sm:py-3.5 font-medium text-white rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, var(--rose-pink), var(--purple))',
                      boxShadow: '0 8px 32px rgba(244, 114, 182, 0.3)'
                    }}
                  >
                    <Trash2 size={18} />
                    Delete
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full opacity-20" 
                   style={{ background: 'var(--sky-blue)' }} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full opacity-20" 
                   style={{ background: 'var(--amber)' }} />
              <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full opacity-10" 
                   style={{ background: 'var(--purple)' }} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;