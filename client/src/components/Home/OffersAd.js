import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const OffersAd = ({ offersAds }) => {
  const offers = offersAds

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  }, [offers.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? offers.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg shadow-lg bg-gray-50">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {offers.map((offer, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex flex-col md:flex-row items-center bg-gradient-to-r from-green-400 to-green-800 text-white p-6"
          >
            <img
              src={offer.image}
              alt={offer.heading}
              className="w-full md:w-1/2 rounded-md object-cover"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">{offer.heading}</h2>
              <p className="text-lg mt-2">{offer.description}</p>
              <Link to='/products'>
                <button className="mt-4 px-6 py-2 bg-white text-green-600 font-semibold rounded-full shadow hover:bg-gray-100">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default OffersAd;
