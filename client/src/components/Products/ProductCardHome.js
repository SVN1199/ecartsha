import React from 'react';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ProductCardHome = ({ products, offers, wishList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 justify-center p-2 sm:p-2 lg:p-2 md:p-5">
      {products.slice(0, 6).map((product, index) => (
        <div
          className="group relative h-72 w-44 sm:h-72 sm:w-full xl:w-full md:h-72 md:w-full lg:h-72 lg:w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          key={index}
        >
          <Link
            to={`/product/${product.name
              .replace(/\s+/g, '-')
              .toLowerCase()}/${product?.productCode}/${product?._id}`}
            className="h-full w-full flex flex-col"
          >

            <div className="h-48 w-full p-2 relative overflow-hidden">
              <img
                src={product?.images?.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform transform group-hover:scale-110 duration-300"
              />
             
            </div>

            <div className="p-4 flex flex-col gap-2">
              <div className="text-xs uppercase text-primary font-semibold text-center tracking-wider">
                {product?.category}
              </div>

              <div className="text-sm font-medium text-gray-700 text-center">
                {product.name.length > 25
                  ? `${product.name.slice(0, 25)}...`
                  : product.name}
              </div>

              {wishList && (
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-900 font-semibold flex items-center">
                    <FaIndianRupeeSign className="mr-1" />
                    {product?.price}
                  </div>

                  <div className="text-xs text-red-500 font-semibold bg-red-100 px-2 py-1 rounded-full">
                    {product?.discount}% Off
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-bold text-lg tracking-wider">View Details</span>
              </div>
            </div>
          </Link>

          {offers && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product?.discount}% OFF
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCardHome;