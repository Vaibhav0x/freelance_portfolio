import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { db } from "../firebase";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";

// STATIC IMAGES OBJECT - Add multiple images per review index
const STATIC_REVIEW_IMAGES = {
    0: [
        "/images/app_images/tani_1.png",
        "/images/app_images/tani_2.png",
        "/images/app_images/tani_3.png",
        "/images/app_images/tani_4.png"
        // "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop"
    ],
    1: [
        "/images/app_images/mark_1.png",
        "/images/app_images/mark_2.png",
        "/images/app_images/mark_3.png"
        // "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop"
    ],
    2: [
        "/images/app_images/kumagai_1.png",
        "/images/app_images/kumagai_2.png",
        "/images/app_images/kumagai_3.png",
        "/images/app_images/kumagai_4.png"
        // "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop"
    ],
    3: [
        "/images/app_images/alice_1.png",
        "/images/app_images/alice_2.png",
        "/images/app_images/alice_3.png"
        // "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
        // "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop"
    ],
    // Add more review image sets here
    // 4: ["image1.jpg", "image2.jpg"],
    // 5: ["image1.jpg", "image2.jpg", "image3.jpg"],
};

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", country: "", rating: 5, comment: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const scrollRef = useRef(null);

    const fetchReviews = async () => {
        try {
            const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const reviewsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setReviews(reviewsData);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async () => {
        if (!newReview.name || !newReview.country || !newReview.comment) {
            setMessage("Please fill all fields");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        try {
            await addDoc(collection(db, "reviews"), {
                ...newReview,
                createdAt: serverTimestamp(),
            });

            setMessage("Review submitted successfully!");
            setNewReview({ name: "", country: "", rating: 5, comment: "" });
            fetchReviews();
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error submitting review. Please try again.");
            console.error("Error adding review:", error);
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openLightbox = (images, startIndex) => {
        setLightboxImages(images);
        setLightboxIndex(startIndex);
        setLightboxOpen(true);
    };

    const nextLightboxImage = () => {
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
    };

    const prevLightboxImage = () => {
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
    };

    const getStaticImages = (index) => {
        const imageSet = STATIC_REVIEW_IMAGES[index % Object.keys(STATIC_REVIEW_IMAGES).length];
        return imageSet || STATIC_REVIEW_IMAGES[0];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current && reviews.length > 0) {
                const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                const currentScroll = scrollRef.current.scrollLeft;

                if (currentScroll >= maxScroll - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
                }
            }
        }, 4500);

        return () => clearInterval(interval);
    }, [reviews]);

    // Image Carousel Component for each review
    const ImageCarousel = ({ images, reviewIndex }) => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const carouselRef = useRef(null);
        const autoSlideRef = useRef(null);

        // const nextSlide = () => {
        //     setCurrentSlide((prev) => (prev + 1) % images.length);
        // };
        const nextSlide = React.useCallback(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, [images.length]);

        const prevSlide = () => {
            setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        };

        const goToSlide = (index) => {
            setCurrentSlide(index);
        };

        // Auto slide effect
        // useEffect(() => {
        //     if (images.length > 1) {
        //         autoSlideRef.current = setInterval(() => {
        //             nextSlide();
        //         }, 3000);

        //         return () => clearInterval(autoSlideRef.current);
        //     }
        // }, [images.length]);

        useEffect(() => {
            if (images.length > 1) {
                autoSlideRef.current = setInterval(() => {
                    nextSlide();
                }, 3000);
                return () => clearInterval(autoSlideRef.current);
            }
        }, [images.length, nextSlide]); // now valid

        // Scroll carousel
        useEffect(() => {
            if (carouselRef.current) {
                carouselRef.current.scrollTo({
                    left: currentSlide * carouselRef.current.offsetWidth,
                    behavior: 'smooth'
                });
            }
        }, [currentSlide]);

        return (
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden group">
                <div
                    ref={carouselRef}
                    className="flex overflow-x-hidden h-full snap-x snap-mandatory"
                >
                    {images.map((image, idx) => (
                        <div
                            key={idx}
                            className="min-w-full h-full snap-start cursor-pointer"
                            onClick={() => openLightbox(images, idx)}
                        >
                            <img
                                src={image}
                                alt={`Slide ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none"></div>

                {images.length > 1 && (
                    <>
                        {/* Navigation Arrows */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevSlide();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                            <FaChevronLeft size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextSlide();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                        >
                            <FaChevronRight size={16} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToSlide(idx);
                                    }}
                                    className={`transition-all rounded-full ${idx === currentSlide
                                        ? 'bg-cyan-400 w-6 h-2'
                                        : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-medium z-10">
                            {currentSlide + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950 relative overflow-hidden" id="reviews">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        What Our Clients Say
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Discover why thousands trust us with their success
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-20"
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-custom snap-x snap-mandatory"
                    >
                        {reviews.length === 0 ? (
                            <div className="w-full flex items-center justify-center py-12 sm:py-20">
                                <div className="text-center">
                                    <FaStar className="text-5xl sm:text-6xl text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 text-base sm:text-lg px-4">No reviews yet. Be the first to share!</p>
                                </div>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[400px] snap-center"
                                >
                                    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                                        <ImageCarousel images={getStaticImages(index)} reviewIndex={index} />

                                        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                                            <div className="flex gap-1 mb-4 sm:mb-6">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={`text-lg sm:text-xl md:text-2xl ${i < review.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-600"
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            <FaQuoteLeft className="text-2xl sm:text-3xl text-purple-400/30 mb-3 sm:mb-4" />

                                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow line-clamp-4">
                                                "{review.comment}"
                                            </p>

                                            <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-700/50">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl shadow-lg flex-shrink-0">
                                                    {review.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-white font-semibold text-base sm:text-lg truncate">{review.name}</h4>
                                                    <p className="text-gray-400 text-xs sm:text-sm">
                                                        {review.createdAt?.toDate
                                                            ? review.createdAt.toDate().toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })
                                                            : ""}
                                                    </p>
                                                    {review.country && (
                                                        <p className="text-gray-500 text-xs mt-0.5 truncate">{review.country}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-2xl">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg shadow-purple-500/30">
                                <FaStar className="text-white text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Share Your Experience
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Your feedback matters to us
                            </p>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    className="w-full px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-500 transition-all text-sm sm:text-base"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={newReview.country}
                                    onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                                    className="w-full px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-500 transition-all text-sm sm:text-base"
                                    placeholder="United States"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Rating
                                </label>
                                <div className="flex gap-2 sm:gap-3 justify-center bg-gray-900/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <motion.button
                                            key={rating}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating })}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`text-2xl sm:text-3xl md:text-4xl transition-all ${rating <= newReview.rating
                                                ? "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                                                : "text-gray-600 hover:text-gray-500"
                                                }`}
                                        >
                                            <FaStar />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Comment
                                </label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white resize-none placeholder-gray-500 transition-all text-sm sm:text-base"
                                    placeholder="Share your experience..."
                                />
                            </div>

                            <motion.button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-purple-500/40 transition-all"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </motion.button>

                            {message && (
                                <p
                                    className={`text-sm text-center ${message.includes("successfully")
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-cyan-400 transition-colors z-10 bg-black/50 p-2 sm:p-3 rounded-full hover:bg-black/70"
                        >
                            <FaTimes size={20} className="sm:w-6 sm:h-6" />
                        </motion.button>

                        <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={lightboxImages[lightboxIndex]}
                                alt="Review"
                                className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />

                            {lightboxImages.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={prevLightboxImage}
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-cyan-500/80 text-white p-2 sm:p-4 rounded-full transition-all backdrop-blur-sm"
                                    >
                                        <FaChevronLeft size={20} className="sm:w-6 sm:h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={nextLightboxImage}
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-cyan-500/80 text-white p-2 sm:p-4 rounded-full transition-all backdrop-blur-sm"
                                    >
                                        <FaChevronRight size={20} className="sm:w-6 sm:h-6" />
                                    </motion.button>

                                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-medium text-sm sm:text-base">
                                        {lightboxIndex + 1} / {lightboxImages.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .scrollbar-custom::-webkit-scrollbar {
                    height: 8px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                    background: rgba(31, 41, 55, 0.3);
                    border-radius: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: linear-gradient(to right, #06b6d4, #a855f7);
                    border-radius: 10px;
                }
                .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to right, #0891b2, #9333ea);
                }
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default ReviewsSection;