

// Accepts an array of reviews and returns average rating
export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return parseFloat((total / reviews.length).toFixed(1));
}

