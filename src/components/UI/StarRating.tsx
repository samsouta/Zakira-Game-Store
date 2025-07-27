import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { liquidGlassClasses } from '../../style/LiquidGlass';

interface StarRatingProps {
    onChange?: (rating: number) => void;  // Optional callback when rating changes
    defaultValue?: number;                // Initial rating value
    className?: string; 
    isRate?: boolean; 
    setIsRate?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StarRating = ({ onChange, defaultValue = 0, className, isRate , setIsRate }: StarRatingProps) => {
    const [rating, setRating] = useState<number>(defaultValue);
    const [hoverRating, setHoverRating] = useState<number>(0);
    
    // Update rating when defaultValue prop changes
    useEffect(() => {
        setRating(defaultValue);
    }, [defaultValue]);

    // Constants
    const MAX_STARS = 5;

    // Event Handlers
    const handleStarClick = (starIndex: number): void => {
        const newRating = starIndex + 1;
        setRating(newRating);
        onChange?.(newRating);
        setIsRate?.(false);

    };

    const handleStarHover = (starIndex: number): void => {
        setHoverRating(starIndex + 1);
    };

    const handleMouseLeave = (): void => {
        setHoverRating(0);
    };

    const handleReset = (): void => {
        setRating(0);
        onChange?.(0);
    };

    // Helper function to determine star color based on rating and hover state
    const getStarColor = (starIndex: number): string => {
        const currentRating = hoverRating || rating;
        return starIndex < currentRating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 hover:text-yellow-300';
    };

    // Styles
    const starButtonClasses = `
        transition-all duration-300 ${isRate ? "text-red-600 animate-shake " : ""} ease-in-out transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
        rounded-full p-1
    `;

    const resetButtonClasses = `
        px-3 py-1 text-xs font-medium opacity-70 hover:text-gray-700
        border border-gray-300 hover:border-gray-400 rounded-full
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
    `;

    return (
        <div className={`flex flex-col items-center space-y-4 ${className} ${liquidGlassClasses?.liquidText}`}>
            {/* Star Rating Buttons */}
            <div className="flex items-center space-x-1">
                {[...Array(MAX_STARS)].map((_, index) => (
                    <button
                        type='button'
                        key={index}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleStarHover(index)}
                        onMouseLeave={handleMouseLeave}
                        className={`${starButtonClasses} ${getStarColor(index)}`}
                        aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
                    >
                        <Star
                            size={32}
                            className="transition-colors duration-200"
                        />
                    </button>
                ))}
            </div>

            {/* Rating Display and Reset Button */}
            <div className="flex items-center space-x-4">
                <div className="text-sm">
                    {rating > 0 ? (
                        <span className="font-medium opacity-70">
                            {rating} out of {MAX_STARS} star{rating > 1 ? 's' : ''}
                        </span>
                    ) : (
                        <span className="opacity-70">No rating selected</span>
                    )}
                </div>

                {rating > 0 && (
                    <button
                        onClick={handleReset}
                        className={resetButtonClasses}
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};