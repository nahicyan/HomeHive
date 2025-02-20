import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
  AccordionItemHeading,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./Why.css";
import data from "../../utils/accordion";

const Why = () => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Centralized state

  return (
    <section className="bg-gradient-to-r from-white to-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Title & Subtext */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We stand out from the crowd by offering unparalleled service, expert guidance, and
            a commitment to your success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            {/* Icon */}
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20l9-5-9-5-9 5 9 5z" />
                <path d="M12 12l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Expert Guidance
            </h3>
            <p className="text-gray-600">
              Our team of seasoned professionals ensures you make the best
              decisions every step of the way.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            {/* Icon */}
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Exclusive Listings
            </h3>
            <p className="text-gray-600">
              Access properties you won't find anywhere else, giving you a
              competitive edge.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            {/* Icon */}
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Personalized Support
            </h3>
            <p className="text-gray-600">
              We tailor our approach to meet your unique needs, providing a
              one-on-one experience.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            {/* Icon */}
            <div className="mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2z" />
                <path d="M17 21v-8H7v8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Transactions
            </h3>
            <p className="text-gray-600">
              From offer to closing, rest assured your investments and data are
              fully protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
