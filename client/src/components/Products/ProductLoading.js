import React from 'react';

const ProductLoading = () => {
  const MultiCard = () => {
    const cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(
        <div
          key={i}
          className="loading-card h-48 sm:h-56 md:h-64 lg:h-72 w-full bg-gray-200 opacity-10 rounded-md"
        ></div>
      );
    }
    return cards;
  };

  return (
    <div className="min-h-screen w-full bg-white p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {MultiCard()}
    </div>
  );
};

export default ProductLoading;