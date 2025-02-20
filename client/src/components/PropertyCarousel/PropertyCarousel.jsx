import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Basic modal for zoomed-in carousel
function ImageModal({ images, currentIndex, onClose, onNext, onPrev }) {
  if (!images.length) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-white/30 p-2 rounded hover:bg-white/50 transition"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Main Image */}
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        {/* Prev Arrow */}
        <button
          className="absolute left-2 bg-white/30 p-2 rounded hover:bg-white/50 transition hidden sm:block"
          onClick={onPrev}
        >
          <ChevronLeftIcon className="w-5 h-5 text-white" />
        </button>

        <img
          src={images[currentIndex]}
          alt={`Zoomed ${currentIndex + 1}`}
          className="max-h-[80vh] object-contain"
        />

        {/* Next Arrow */}
        <button
          className="absolute right-2 bg-white/30 p-2 rounded hover:bg-white/50 transition hidden sm:block"
          onClick={onNext}
        >
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </button>

        {/* Image count */}
        <span className="absolute bottom-4 right-4 text-sm bg-black/70 text-white px-2 py-1 rounded">
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
}

export default function PropertyCarousel({ propertyData }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Thumbnails container ref (desktop scroll)
  const thumbsRef = useRef(null);

  // Parse JSON images from propertyData
  useEffect(() => {
    if (propertyData?.image) {
      try {
        const parsedImages = JSON.parse(propertyData.image);
        // Convert each image path into a full URL
        const fullUrls = parsedImages.map(
          (img) => `${import.meta.env.VITE_SERVER_URL}/${img}`
        );
        setImages(fullUrls);
      } catch (error) {
        console.error("Failed to parse image data:", error);
      }
    }
  }, [propertyData]);

  // Navigation logic
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Scroll the thumbnails container (desktop)
  const scrollUp = () => {
    thumbsRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  };
  const scrollDown = () => {
    thumbsRef.current?.scrollBy({ top: 80, behavior: "smooth" });
  };

  // Open/close modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // If no images are found, show a fallback
  if (!images.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No images available for this property.
      </div>
    );
  }

  // Next/prev inside modal
  const modalNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const modalPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Card className="bg-[#FDF8F2] border-0 shadow-none">
        {/* Title */}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Photo Gallery
          </CardTitle>
        </CardHeader>

        {/* 
          Fix a 600px height on desktop so images fill that space.
          "h-auto" on mobile to let it shrink.
        */}
        <CardContent className="flex flex-col lg:flex-row gap-4 lg:h-[600px]">
          {/* Main Image Section (3/4 on desktop) */}
          <div className="relative lg:w-3/4 h-auto lg:h-full flex items-center justify-center">
            {/* Left Arrow (Desktop) */}
            <Button
              variant="ghost"
              className="absolute left-2 z-10 bg-[#FDF8F2]"
              onClick={prevImage}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>

            {/* Main Image (click to open modal) */}
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-pointer"
              onClick={openModal}
            >
              {/* Count in top-right corner */}
              <span className="absolute top-2 right-2 text-sm bg-black/70 text-white px-2 py-1 rounded">
                {currentIndex + 1}/{images.length}
              </span>
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Arrow (Desktop) */}
            <Button
              variant="ghost"
              className="absolute right-2 z-10 bg-[#FDF8F2]"
              onClick={nextImage}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Thumbnails Section (1/4 on desktop) */}
          <div className="lg:w-1/4 relative h-auto lg:h-full flex flex-col">
            {/* Up Arrow (desktop only) */}
            <Button
                variant="ghost"
                className="
                hidden lg:flex
                absolute top-2 left-1/2 -translate-x-1/2
                z-10 bg-[#FDF8F2]
                "
                onClick={scrollUp}
            >
          <ChevronUpIcon className="w-5 h-5" />
        </Button>

            {/* Thumbs Container (shows 3 images, no scrollbar) */}
            <div
              ref={thumbsRef}
              className="
                flex lg:flex-col gap-2
                no-scrollbar
                overflow-y-auto
                h-full
                pb-2
              "
            >
              {images.map((src, index) => (
                <div
                  key={src}
                  className={`
                    cursor-pointer w-24 h-16 lg:w-full lg:h-[30%] flex-none
                    rounded border-2
                    hover:scale-105 transition-transform
                    ${
                      index === currentIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }
                  `}
                  onClick={() => goToImage(index)}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>

            {/* Down Arrow (desktop only) */}
            <Button
                variant="ghost"
                  className="
                  hidden lg:flex
                  absolute bottom-2 left-1/2 -translate-x-1/2
                 z-10 bg-[#FDF8F2]
                "
                  onClick={scrollDown}
            >
             <ChevronDownIcon className="w-5 h-5" />
            </Button>

          </div>
        </CardContent>

        {/* Mobile-only Arrows */}
        {/* <div className="flex sm:hidden justify-between mt-2 px-4">
          <Button onClick={prevImage} variant="outline" className="w-1/2 mr-1">
            Prev
          </Button>
          <Button onClick={nextImage} variant="outline" className="w-1/2 ml-1">
            Next
          </Button>
        </div> */}
      </Card>

      {/* Zoomed-In Modal */}
      {showModal && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          onClose={closeModal}
          onNext={modalNext}
          onPrev={modalPrev}
        />
      )}
    </>
  );
}
