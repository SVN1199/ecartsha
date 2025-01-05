import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeImages } from '../../actions/homeAction';

const HomeSlider = () => {
  const { homeImages = [] } = useSelector((state) => state.homeState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeImages());
  }, [dispatch]);

  const images = homeImages.length > 0 ? homeImages : [
    { image: '/images/women1.jpg', caption: 'Explore Women’s Fashion' },
    { image: '/images/women2.jpg', caption: 'New Arrivals Just for You' },
    { image: '/images/women3.jpg', caption: 'Find Your Style Today' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[550px] mx-auto shadow-lg rounded-lg overflow-hidden">

      <div
        className="w-full h-full transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          display: 'flex',
        }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
              {item.caption}
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
        onClick={handleNext}
      >
        &#8594;
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;