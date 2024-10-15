import React, { useState } from 'react';
import FaStar from '@mui/icons-material/Star';
import men from '../assets/Images/model4.png'

const reviews = [
  {
    name: "John Doe",
    profilePic: men,
    rating: 5,
    comment: "This jacket exceeded my expectations. Amazing quality and perfect fit. Highly recommend!",
    date: "Oct 5, 2023",
  },
  {
    name: "Alex Smith",
    profilePic: men,
    rating: 4,
    comment: "The material is great, but the size runs a bit smaller than expected.",
    date: "Sep 20, 2023",
  },
  {
    name: "Michael Lee",
    profilePic: men,
    rating: 5,
    comment: "Perfect for fall. Stylish and comfortable. Will definitely buy again.",
    date: "Aug 12, 2023",
  },
  // Add more reviews as needed
];

const UserReviewSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const handleNextReview = () => {
    setCurrentReview((prevReview) => (prevReview + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReview((prevReview) => (prevReview - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Customer Reviews</h2>
        <p className="text-lg text-gray-400">Hear from our satisfied customers</p>
      </div>
      
      {/* Current Review */}
      <div className="relative max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <img
            src={reviews[currentReview].profilePic}
            alt={reviews[currentReview].name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">{reviews[currentReview].name}</h3>
            <p className="text-gray-400">{reviews[currentReview].date}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(reviews[currentReview].rating)].map((star, index) => (
            <FaStar key={index} className="text-yellow-400 mr-1" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-lg mb-6">{reviews[currentReview].comment}</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevReview}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={handleNextReview}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Call to Action: Submit Review */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-400 mb-4">Want to share your experience with us?</p>
        <button className="bg-white text-black py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">
          Submit Your Review
        </button>
      </div>
    </section>
  );
};

export default UserReviewSection;
