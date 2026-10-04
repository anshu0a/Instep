
import { useState } from "react";
import {
    FiStar,
    FiSend,
    FiX,
    FiArrowRight
} from "react-icons/fi";
import "./review.css";

const reviewData = [
    {
        id: 1,
        name: "Rahul Sharma",
        username: "rahul",
        rating: 5,
        review: "Really simple and clean experience. I like how easy it is to discover people."
    },
    {
        id: 2,
        name: "Priya Singh",
        username: "priya",
        rating: 4,
        review: "The community feels simple and personal. Looking forward to seeing more features."
    },
    {
        id: 3,
        name: "Aman Verma",
        username: "aman",
        rating: 5,
        review: "Clean interface, smooth experience and a nice place to connect with people."
    },
    {
        id: 4,
        name: "Neha Gupta",
        username: "neha",
        rating: 5,
        review: "I really like the idea of keeping everything simple and connected."
    },
    {
        id: 5,
        name: "Arjun Mehta",
        username: "arjun",
        rating: 4,
        review: "A nice platform with a clean experience and interesting community."
    },
    {
        id: 6,
        name: "Riya Patel",
        username: "riya",
        rating: 5,
        review: "The overall experience feels personal and easy to use."
    }
];

export default function Reviews() {
    const [reviews, setReviews] = useState(reviewData);
    const [showReview, setShowReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    function submitReview(e) {
        e.preventDefault();

        if (!rating || !review.trim()) return;

        setReviews(prev => [
            {
                id: Date.now(),
                name: "You",
                username: "you",
                rating,
                review: review.trim()
            },
            ...prev
        ]);

        setRating(0);
        setReview("");
        setShowReview(false);
    }

    const average =
        reviews.reduce((sum, item) => sum + item.rating, 0) /
        reviews.length;

    return (
        <main className="reviewsPage">

            <section className="reviewsHero">

                <div className="reviewsLabel">
                    <span></span>
                    COMMUNITY REVIEWS
                </div>

                <h1>
                    Real words.
                    <br />
                    <em>Real people.</em>
                </h1>

                <p>
                    See what people are saying about their
                    <br />
                    experience with the Instep community.
                </p>

                <button
                    type="button"
                    className="reviewsWriteButton"
                    onClick={() => setShowReview(true)}
                >
                    Write a review
                    <FiArrowRight />
                </button>

            </section>

            <section className="reviewsStats">

                <div className="reviewsRatingBig">
                    <strong>{average.toFixed(1)}</strong>

                    <div>
                        <div className="reviewsStars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <FiStar
                                    key={star}
                                    className="reviewStarFilled"
                                />
                            ))}
                        </div>

                        <span>
                            Based on {reviews.length} reviews
                        </span>
                    </div>
                </div>

                <div className="reviewsStatsLine"></div>

                <div className="reviewsStatsText">
                    <span>COMMUNITY VOICE</span>
                    <p>
                        Every review comes from someone
                        who has experienced Instep.
                    </p>
                </div>

            </section>

            <section className="reviewsList">

                <div className="reviewsListTop">
                    <div>
                        <span>WHAT PEOPLE SAY</span>
                        <h2>
                            From the
                            <br />
                            <em>community.</em>
                        </h2>
                    </div>

                    <span className="reviewsCount">
                        {reviews.length} REVIEWS
                    </span>
                </div>

                <div className="reviewsGrid">

                    {reviews.map(item => (
                        <article
                            className="reviewItem"
                            key={item.id}
                        >

                            <div className="reviewItemTop">

                                <div className="reviewAvatar">
                                    {item.name.charAt(0)}
                                </div>

                                <div>
                                    <h3>{item.name}</h3>
                                    <span>@{item.username}</span>
                                </div>

                            </div>

                            <div className="reviewItemRating">

                                {[1, 2, 3, 4, 5].map(star => (
                                    <FiStar
                                        key={star}
                                        className={
                                            star <= item.rating
                                                ? "reviewStarFilled"
                                                : ""
                                        }
                                    />
                                ))}

                            </div>

                            <p>
                                “{item.review}”
                            </p>

                            <div className="reviewItemBottom">
                                <span>VERIFIED EXPERIENCE</span>
                            </div>

                        </article>
                    ))}

                </div>

            </section>

            {showReview && (
                <div
                    className="reviewsOverlay"
                    onClick={() => setShowReview(false)}
                >

                    <div
                        className="reviewsModal"
                        onClick={e => e.stopPropagation()}
                    >

                        <button
                            type="button"
                            className="reviewsClose"
                            onClick={() => setShowReview(false)}
                        >
                            <FiX />
                        </button>

                        <span className="reviewsModalLabel">
                            YOUR EXPERIENCE
                        </span>

                        <h2>
                            Leave a
                            <br />
                            <em>review.</em>
                        </h2>

                        <form onSubmit={submitReview}>

                            <div className="reviewsRatingInput">

                                <span>Your rating</span>

                                <div>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={
                                                star <= rating
                                                    ? "ratingActive"
                                                    : ""
                                            }
                                        >
                                            <FiStar />
                                        </button>
                                    ))}
                                </div>

                            </div>

                            <textarea
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                placeholder="Tell us about your experience..."
                                maxLength={500}
                            />

                            <button
                                type="submit"
                                className="reviewsSubmit"
                                disabled={!rating || !review.trim()}
                            >
                                <span>Submit review</span>
                                <FiSend />
                            </button>

                        </form>

                    </div>

                </div>
            )}

        </main>
    );
}

