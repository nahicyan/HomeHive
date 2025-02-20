import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import "./GetStarted.css";

export const GetStarted = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-md mx-auto px-4 text-center">
        {/* Heading & Subtext */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Join Our Exclusive Buyers List
        </h2>
        <p className="text-gray-600 mb-6">
          Get notified before everyone else, receive instant discounts on
          properties, and stay up to date with notifications only in the areas
          you care about.
        </p>

        {/* Pricing Display */}
        <div className="flex justify-center items-baseline space-x-3 mb-8">
          <span className="text-xl sm:text-2xl font-medium text-gray-500 line-through">
            Listed Price
          </span>
          <span className="text-3xl sm:text-4xl font-bold text-green-600">
            Big Discount
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-3 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white 
                       font-semibold py-3 rounded-md transition-colors"
          >
            Get Started
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Your email is 100% confidential and we won't spam you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
