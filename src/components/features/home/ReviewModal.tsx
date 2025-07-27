import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { liquidGlassClasses } from '../../../style/LiquidGlass';
import { useGetAllCommentsQuery } from '../../../services/API/review';
import { timeAgo } from '../../../lib/time';
import { calculateAverageRating } from '../../../lib/calculateRating';
import { Loading } from '../../UI/Loading';
import type { CommentType } from '../../../types/commentType';
import echo from '../../../lib/echo';

// Props interface for the ReviewModal component
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  // Fetch comments data using the API hook
  const { data: comments, isLoading, error } = useGetAllCommentsQuery();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);


  /**
 * Listen for real-time user updates via WebSocket
 * Uses Laravel Echo to subscribe to the 'users' channel
 * Logs updated user data when '.UserUpdated' event is received
 */
  useEffect(() => {
    if (comments?.data) {
      setCommentList(comments.data);
    }

    const channel = echo.channel('reviews');
    channel.listen('ReviewCreated', (payload: CommentType) => {
      setCommentList(prev => [payload, ...prev]);
    });

    return () => {
      channel.stopListening('ReviewCreated');
    };
  }, [comments]);
  /**
   * Renders a row of star icons based on the given rating
   * @param rating - The rating value (1-5)
   * @returns Array of Star components
   */
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-500 dark:text-gray-200'
          }`}
      />
    ));
  };

  // Filter comments based on selected rating
  const filteredComments = commentList.filter(review =>
    selectedRating ? review.rating === selectedRating : true
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Modal backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            className={`relative w-full max-w-2xl max-h-[80vh] transform overflow-hidden rounded-2xl ${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* /loading.... */}
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loading />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-red-500">Error loading reviews. Please try again later.</p>
              </div>
            ) : (
              <>
                {/* Modal header */}
                <div className={`${liquidGlassClasses?.header} sticky top-0 z-10 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold oxanium">Reviews</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.round(calculateAverageRating(commentList)))}
                          </div>
                          <span className="text-sm opacity-70">
                            {calculateAverageRating(commentList).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
                    >
                      <X className="h-5 w-5 opacity-70" />
                    </motion.button>
                  </div>

                  {/* Rating filter buttons */}
                  <div className="flex items-center space-x-2 mt-4 overflow-x-scroll p-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                        className={`px-3 py-1.5 rounded-full flex items-center space-x-1 transition-colors ${selectedRating === rating
                            ? 'bg-yellow-400'
                            : 'bg-gray-400 '
                          }`}
                      >
                        <Star className={`h-4 w-4 ${selectedRating === rating ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{rating}</span>
                      </motion.button>
                    ))}
                    {selectedRating && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRating(null)}
                        className="px-3 py-1.5 rounded-full bg-red-500 hover:bg-gray-200 text-sm font-medium"
                      >
                        Clear
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Reviews list */}
                <div className="px-6 pb-24 mt-2 overflow-y-auto max-h-[calc(80vh-120px)]">
                  <div className="space-y-4">
                    {filteredComments?.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No reviews found.</p>
                    ) : (
                      filteredComments?.map((review, index) => (
                        <motion.div
                          key={review?.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-xl border transition-colors ${liquidGlassClasses?.base}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src="https://ik.imagekit.io/deceuior6/PHOTO/11f98e8b-2b04-4239-ac6e-b439764155ef.webp?updatedAt=1752902895690"
                                alt={`${review?.user?.username}'s avatar`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium oxanium">
                                  {review?.user?.username}
                                </h4>
                                <span className="text-xs opacity-70">
                                  {timeAgo(review?.created_at)}
                                </span>
                              </div>
                              <div className="flex items-center mt-1 mb-2">
                                {renderStars(review?.rating)}
                              </div>
                              <p className="text-sm opacity-70 leading-relaxed">
                                {review?.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
