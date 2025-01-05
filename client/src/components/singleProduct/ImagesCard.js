import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useState } from 'react';

const ImagesCard = ({ images, handleAddToCart, isLoading }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseMove = (e, imageIndex) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setHoveredImage({ index: imageIndex, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  if (isLoading) {
    return (
      <div className="skeleton-loading">
        <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
        <div className="flex flex-row px-2 gap-2 text-white font-semibold mt-4">
          <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div>
        <Carousel
          className="p-2"
          showThumbs={false}
          showStatus={true}
          showArrows={true}
          infiniteLoop={true}
        >
          {images?.map((prd, index) => (
            <div
              key={index}
              className="carousel-slide h-96 overflow-hidden relative"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={prd.image}
                alt=""
                className={`h-full w-full object-contain transition-transform duration-300 ${
                  hoveredImage?.index === index ? 'scale-150' : 'scale-100'
                }`}
                style={
                  hoveredImage?.index === index
                    ? {
                        transformOrigin: `${hoveredImage.x}% ${hoveredImage.y}%`,
                      }
                    : {}
                }
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-row px-2 gap-2 text-white font-semibold mt-4">
        <button
          className="w-full p-2 rounded bg-gradient-to-tr from-primary to-green-950"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ImagesCard;