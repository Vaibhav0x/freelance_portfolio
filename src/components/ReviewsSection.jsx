import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { db } from "../firebase";  // 👈 import Firestore

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";


// const API_BASE = process.env.REACT_APP_NEXT_PUBLIC_REVIEWS_API;



const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", country: "", rating: 5, comment: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const scrollRef = useRef(null);
    const autoSlideInterval = useRef(null);

    // Fetch reviews from Firestore
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
    // const fetchReviews = async () => {
    //     try {
    //         const url = `${API_BASE}/reviews`;

    //         const response = await fetch(url);

    //         // If server doesn't send JSON, log the raw text to debug
    //         const contentType = response.headers.get("content-type");
    //         if (!contentType || !contentType.includes("application/json")) {
    //             const text = await response.text();
    //             throw new Error(`Expected JSON, got: ${text.substring(0, 200)}`);
    //         }

    //         const data = await response.json();
    //         setReviews(Array.isArray(data) ? data : data.reviews || []);
    //     } catch (error) {
    //         console.error("Error fetching reviews:", error);
    //         setReviews([]);
    //     }
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setMessage("");

    //     try {
    //         const response = await fetch(`${API_BASE}/reviews`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 ...newReview,
    //                 date: new Date().toISOString().split("T")[0], // Only date
    //             }),
    //         });


    //         if (response.ok) {
    //             setMessage("Review submitted successfully!");
    //             setNewReview({ name: "", country: "", rating: 5, comment: "" });
    //             fetchReviews();
    //         } else {
    //             setMessage("Failed to submit review. Please try again.");
    //         }
    //     } catch (error) {
    //         setMessage("Error submitting review. Please try again.");
    //         console.error("Error:", error);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    // Submit new review to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } catch (error) {
            setMessage("Error submitting review. Please try again.");
            console.error("Error adding review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Vertical auto-scroll
    useEffect(() => {
        autoSlideInterval.current = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({
                    top: 220, // height per card
                    behavior: "smooth",
                });
                if (
                    scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
                    scrollRef.current.scrollHeight
                ) {
                    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
        }, 3500);

        return () => clearInterval(autoSlideInterval.current);
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8" id="reviews">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Client Reviews
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left - Vertical Scrolling Reviews */}
                    <div
                        ref={scrollRef}
                        className="h-[500px] overflow-y-auto scrollbar-hide space-y-6 pr-2"
                    >
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-cyan-400/20 shadow-lg"
                            >
                                {/* Top row: Name + Date on left, Stars + Country on right */}
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                        <span className="text-gray-400 text-sm">
                                            {review.createdAt?.toDate
                                                ? review.createdAt.toDate().toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })
                                                : ""}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex text-yellow-400 justify-end">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                        {review.country && (
                                            <div className="text-gray-300 text-sm mt-1">{review.country}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Description starts directly under date */}
                                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right - Add Review Form */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gray-900/40 backdrop-blur-lg p-6 rounded-xl border border-cyan-400/20 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">
                            Share Your Experience
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                                <input
                                    type="text"
                                    value={newReview.country}
                                    onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating })}
                                            className={`text-2xl ${rating <= newReview.rating
                                                ? "text-yellow-400"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, comment: e.target.value })
                                    }
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-lg font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
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
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
