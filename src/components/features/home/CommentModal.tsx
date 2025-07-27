import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Smile, MessageCircle } from 'lucide-react';
import { liquidGlassClasses } from '../../../style/LiquidGlass';
import { StarRating } from '../../UI/StarRating';
import { usePostCommentMutation } from '../../../services/API/review';
import Cookies from 'js-cookie';
import { LiquidModal } from '../../UI/NotiModal/LiquidModal';
import type { NotificationType } from '../../../types/notiModelType';
import { Loading } from '../../UI/Loading';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demos = [
  {
    type: 'success' as const,
    title: 'comment Successful',
    message: ' အခုလို "REVIEW" ရေး ပေးတဲ့အတွက် ကျေးဇူးအထူးတင်ရှိပါတယ် ❤️‍🔥❤️‍🔥 ',
    btnText: 'OK',
    buttonClass: 'from-sky-500 to-blue-600 shadow-sky-500/25',
    router: ''
  }
];

const emojis = ['😊', '😍', '🤔', '👍', '❤️', '🎉', '🔥', '💯'];

export const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose }) => {
  const [comment, setComment] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
  const [isRate, setIsRate] = useState(false);
  const [postComment, { isLoading }] = usePostCommentMutation();
  const Info = JSON.parse(Cookies.get('user') || '{}');

  /**
   * @useEffect Handle Reset states when modal opens/closes
   */
  useEffect(() => {
    if (isOpen) {
      // Reset all states when modal opens
      setComment('');
      setCurrentRating(0);
      setIsRate(false);
      setShowEmojis(false);
    }
  }, [isOpen]);

  /**
   * @function handle Comment
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      return; // Exit if comment is empty
    }

    if (currentRating <= 0) {
      setIsRate(true);
      setTimeout(() => {
        setIsRate(false)
      }, 200);
      return;
    }

    try {
      const response = await postComment({
        user_id: Info?.id,
        rating: currentRating,
        comment: trimmedComment
      }).unwrap();

      if (response?.success) {
        // Only reset and close if the request was successful
        setComment('');
        setCurrentRating(0);
        setIsRate(false);
        setShowEmojis(false);
        onClose();
        setActiveModal('success');
      }

    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const handleClose = () => {
    // Reset all states when modal closes
    setComment('');
    setCurrentRating(0);
    setIsRate(false);
    setShowEmojis(false);
    onClose();
  };

  const addEmoji = (emoji: string) => {
    setComment(prev => prev + emoji);
    setShowEmojis(false);
  };

  /**
   * @function Handle Voting Star 
   */
  const handleRatingChange = (rating: number) => {
    setIsRate(false);
    setCurrentRating(rating);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 sm:items-center sm:p-0"
            onClick={handleClose}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className={`relative w-full max-w-md transform overflow-hidden rounded-2xl ${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* // loading when fetching.... */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center  z-50">
                  <Loading />
                </div>
              )}

              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Add Comment
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
                  >
                    <X className="h-5 w-5 opacity-70" />
                  </motion.button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 pb-6">
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className={` ${liquidGlassClasses?.textArea}`}
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowEmojis(!showEmojis)}
                      className="p-1.5 rounded-full hover:bg-gray-200/50 transition-colors"
                    >
                      <Smile className="h-4 w-4 text-gray-500" />
                    </motion.button>
                    <span className="text-xs text-gray-400">
                      {comment.length}/500
                    </span>
                  </div>
                </div>

                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojis && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 p-3  rounded-xl border border-gray-200/50"
                    >
                      <div className="flex flex-wrap gap-2">
                        {emojis.map((emoji, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addEmoji(emoji)}
                            className="p-2 rounded-lg hover:bg-white/80 transition-colors"
                          >
                            <span className="text-lg">{emoji}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rating Button  */}
                <div className="p-3">
                  <h2 className="text-md font-semibold mb-6 text-center">
                    Rate Your Experience
                  </h2>
                  <StarRating
                    onChange={handleRatingChange}
                    defaultValue={currentRating}
                    className="mb-4"
                    isRate={isRate}
                    setIsRate={setIsRate}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!comment.trim() || isLoading}
                  className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-4 w-4" />
                  <span>{isLoading ? 'Posting...' : 'Post Comment'}</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Noti Modals box ++++++++++++++++++++++++ */}
      {demos.map((demo) => (
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
      ))}
    </>
  );
};