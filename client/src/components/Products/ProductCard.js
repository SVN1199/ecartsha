import { useState } from "react";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ProductCard = ({ products, handleAddWishList, handleRemoveWishList, wishList, user }) => {

  const [hoverPart, setHoverPart] = useState(false);

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 ">
      {
        products?.map(product => (
          <div
            key={product._id}
            className="relative w-full h-96 lg:min-h-96 sm:h-96 my-1 overflow-hidden  bg-white p-1 cursor-pointer flex flex-col gap-0 lg:gap-1 sm:gap-0"
            onMouseEnter={() => setHoverPart(product._id)}
            onMouseLeave={() => setHoverPart(null)}
          >

            {user && (
              <div className="absolute top-1 right-1 z-20">
                <div
                  className="p-2 bg-gray-200 rounded-full cursor-pointer"
                  onClick={() => Array.isArray(wishList) && wishList.some(item => item._id === product._id)
                    ? handleRemoveWishList(product?._id)
                    : handleAddWishList(product?._id)
                  }
                >
                  <FaHeart size={20} color={Array.isArray(wishList) && wishList.some(item => item._id === product._id) ? "red" : "gray"} />
                </div>

              </div>
            )}
            <Link to={`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}/${product?.productCode}/${product?._id}`}>

              <div className="w-full h-48 lg:h-48 sm:h-48  flex justify-center items-center overflow-hidden">
                <img
                  src={product?.images?.image}
                  alt="product"
                  className={`max-w-full max-h-full object-contain transition-transform ${hoverPart === product._id ? "transform duration-200 hover:scale-110" : "" } `}
                />
              </div>

              <div
                className={`w-full h-3/6 flex flex-col gap-3 p-2 bg-white transition-transform ${hoverPart === product._id ? "transform -translate-y-2 scale-105" : ""
                  }`}
              >
                <div className="text-xs capitalize text-gray-600 font-bold">{product?.category?.name}</div>

                <div className="text-xs sm:text-xs lg:text-sm">{product?.name?.slice(0, 40)} . . .</div>

                <div className="flex flex-row gap-2 items-center text-sm lg:text-md sm:text-sm">

                  <div className="flex flex-row items-center font-semibold">
                    <FaRupeeSign />
                    <span>{product?.finalPrice}</span>
                  </div>

                  <div className="flex flex-row items-center opacity-60 line-through text-xs">
                    <FaRupeeSign />
                    <span>{product?.price}</span>
                  </div>

                  <div className="flex flex-row items-center">
                    <span className="text-xs text-green-600">{product?.discount}% off</span>
                  </div>

                </div>

                <div className="text-xs flex flex-row justify-between  items-center">
                  <div className="w-3/6 bg-gray-100 p-0.5 rounded-sm text-center">
                    <span className="font-semibold text-blue-800 opacity-70 "> Flash Sale</span>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-1.5 text-sm">
                  <span className="opacity-65" style={{ fontSize: 10 }}>Availabe Size</span>
                  {
                    product?.sizes?.map((size, index) => (
                      <span className="opacity-75 text-xs" key={index}>{size}</span>
                    ))
                  }
                </div>
              </div>
            </Link>
          </div>
        ))
      }

    </div>
  );
};

export default ProductCard;
