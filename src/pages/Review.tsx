import React, { useState, useEffect } from 'react';
import { EmojiRating } from '../components/ui/emoji-rating';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import '../pages/Home.css'; // Import global astrix styles

interface ReviewItem {
  id: string;
  rating: number;
  feedback: string;
  date: string;
}

const EMOJIS = [
  { value: 1, label: 'Terrible', emoji: '😠' },
  { value: 2, label: 'Bad', emoji: '🙁' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Excellent', emoji: '😍' },
];

export default function Review() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Load reviews from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('astrix_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    }
  }, []);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const newReview: ReviewItem = {
        id: Math.random().toString(36).substring(2, 9),
        rating,
        feedback: feedback.trim() || 'No additional feedback provided.',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('astrix_reviews', JSON.stringify(updatedReviews));

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="home-page page-container flex flex-col items-center min-h-[calc(100vh-100px)] py-16 md:py-24 px-4 md:px-8">
      {/* Astrix Signature Soft Background Blobs */}
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full overflow-hidden text-center mb-20 p-8 md:p-16"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="mb-12">
                  <div className="badge mb-6">CLIENT FEEDBACK</div>
                  <h1 className="hero-title mb-4 tracking-tighter text-4xl font-extrabold md:text-5xl lg:text-6xl text-slate-900">
                    Rate Your <span className="text-brand">Experience</span>
                  </h1>
                  <p className="hero-subtitle mx-auto text-lg md:text-xl font-light">We value your feedback. Let us know how we did!</p>
                </div>

                <EmojiRating 
                  onChange={handleRatingChange} 
                  className="mb-16 w-full" 
                />

                <div className="w-full max-w-2xl animate-in fade-in flex flex-col gap-6">
                  <label htmlFor="feedback" className="sr-only">Additional Feedback</label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us more about your experience... (optional)"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-6 text-lg shadow-inner outline-none transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-800 placeholder:text-slate-400 resize-none h-40"
                  />
                  <Button 
                    type="submit" 
                     disabled={!rating || isSubmitting}
                    className="btn-primary w-full h-14 text-lg rounded-xl font-semibold shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl text-green-600">
                  🎉
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Thank you!</h2>
                <p className="text-lg text-slate-600 max-w-sm mx-auto mb-8">
                  Your feedback has been successfully submitted and saved. We appreciate your input!
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setRating(null);
                    setFeedback('');
                  }}
                >
                  Submit Another Review
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Community Reviews Section */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-10 border-b pb-6">Recent Reviews ({reviews.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence>
                {reviews.map((review) => {
                  const emojiObj = EMOJIS.find(e => e.value === review.rating) || EMOJIS[2];
                  
                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      layout
                      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl" title={emojiObj.label}>{emojiObj.emoji}</span>
                          <div className="flex gap-1 text-yellow-400 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current text-yellow-500' : 'fill-slate-200'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-slate-400 font-medium">{review.date}</span>
                      </div>
                      <p className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap mt-2">
                        {review.feedback}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
