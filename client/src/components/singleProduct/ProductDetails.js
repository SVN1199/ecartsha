import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductDetails = ({ isWishListed, product, setProductItemSize, productId, handleAddWishList, handleRemoveWishList, user, isLoading }) => {
  const navigate = useNavigate();

  const [showAllColors, setShowAllColors] = useState(false);

  const handleShowMore = () => {
    setShowAllColors(!showAllColors);
  };

  const [inventoryPrices, setInventoryPrices] = useState({
    id: '',
    price: '',
    discount: '',
    gst: '',
    discountPrice: '',
    totalPrice: '',
  });

  const defaultId = product?.productInventory?.[0]?._id || null;

  const handlePrices = useCallback((id) => {
    const selectedInventory = product.productInventory.find(inv => inv._id === id);
    setProductItemSize(selectedInventory.size);

    if (selectedInventory) {
      setInventoryPrices({
        id: selectedInventory._id || '',
        price: selectedInventory.price.toFixed(2) || '',
        discount: selectedInventory.discount || 0,
        gst: selectedInventory.gst.toFixed(2) || '',
        discountPrice: selectedInventory.finalPrice.toFixed(2) || '',
      });
    } else {
      console.error('Inventory not found');
    }
  }, [product.productInventory, setProductItemSize]);

  useEffect(() => {
    if (defaultId) {
      handlePrices(defaultId);
    }
  }, [defaultId, handlePrices]);

  const [detailToggle, setDetailToggle] = useState(false);

  const handleDetailToggle = () => {
    setDetailToggle(!detailToggle);
  };

  const handleCategoryLink = () => {
    navigate(`/categoryproducts/${product.category._id}`);
  };

  const skeleton = (
    <div className="animate-pulse space-y-4">
      <div className="flex flex-col gap-3">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-4 w-2/6 bg-gray-200 rounded" />
        <div className="h-4 w-3/6 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="flex gap-3 items-center">
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-1/6 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-row justify-center gap-2">
        <div className="h-4 w-1/6 bg-gray-200 rounded" />
        <div className="h-4 w-3/6 bg-gray-200 rounded" />
      </div>

      <div className="h-12 w-full bg-gray-200 rounded mt-2" />
    </div>
  );

  return (
    <div className="flex flex-col gap-12">
      {isLoading ? skeleton : (
        <div className="relative flex flex-col gap-3">
          {user && (
            <div className="absolute top-1 right-1 flex flex-row gap-3 z-20">
              <div
                className="p-2 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => isWishListed
                  ? handleRemoveWishList(product?._id)
                  : handleAddWishList(product?._id)
                }
              >
                <FaHeart size={23} color={isWishListed ? "red" : "gray"} />
              </div>
              <div
                className="p-2 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => console.log('Share button clicked')}
              >
                <FaShareAlt size={23} color="gray"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                />
              </div>
            </div>
          )}


          <div className="flex flex-col gap-1 mt-5 lg:mt-0 sm:mt-5">
            <span className="text-sm font-semibold opacity-40 capitalize cursor-pointer" onClick={() => handleCategoryLink(product?.category?._id)}>
              {`${product?.category?.name}`}
            </span>
            <span className="h-auto w-5/6 font-semibold">
              {product?.name}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-green-500 font-semibold">Special Price</div>

            <div className="flex flex-row gap-3 items-center">
              <div className="flex flex-row gap-1 items-center font-semibold text-2xl">
                <span><FaRupeeSign /></span>
                <span>{inventoryPrices?.discountPrice}</span>
              </div>

              <div className="flex flex-row gap-1 items-center text-gray-600 font-semibold line-through text-sm">
                <span><FaRupeeSign /></span>
                <span>{inventoryPrices.price}</span>
              </div>

              <div className="flex flex-row gap-1 items-center font-semibold text-green-500 text-sm">
                <span>{inventoryPrices.discount}% Offer</span>
              </div>

            </div>

            <div className="flex flex-row gap-1 items-center text-gray-600 font-semibold text-xs">
              <span>+ included</span>
              <span>{inventoryPrices?.gst}% GST</span>
            </div>

          </div>

          <div className="flex flex-row gap-2 items-center">
            <span className="flex flex-row gap-2 items-center font-semibold text-sm bg-green-500 px-2 py-1 rounded-lg text-white">
              <span>{product?.ratings}</span> <FaStar size={12} />
            </span>
            <span className="opacity-70 text-sm">8,000 ratings and {product.noOfReviews} reviews</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10">
        <div className="mb-2 md:mb-0">
          <span className="text-sm font-semibold opacity-70">Color</span>
        </div>

        <div className="w-full grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {(showAllColors ? product?.productsColor : product?.productsColor?.slice(0, 5))?.map((item, index) => (
            <Link
              to={`/product/${item?.name?.replace(/\s+/g, '-').toLowerCase()}/${item?.code}/${item?.prdId}`}
              key={item.color + index}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="relative h-20 w-20 sm:h-20 sm:w-20 cursor-pointer flex items-center justify-center overflow-hidden p-1 rounded"
                style={{
                  border: `${item?.prdId === productId ? '3px solid #064E3B' : '1px solid black'}`,
                }}
              >
                <img
                  src={item?.image}
                  alt={item?.color}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center text-xs font-bold opacity-75 capitalize">{item?.color}</div>
            </Link>
          ))}

          {product?.productsColor?.length > 5 && (
            <div className="flex items-center justify-center col-span-3 sm:col-span-4 md:col-span-5 mt-2">
              <div
                onClick={handleShowMore}
                className="text-sm font-bold opacity-75 text-primary cursor-pointer"
              >
                {showAllColors ? 'Show Less' : 'More'}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center gap-2">
        <div className="w-2/6"><span className="text-sm font-semibold opacity-70">Available Size</span></div>
        <div className="w-5/6 flex flex-row gap-4">
          {product?.productInventory?.map(inventory => (
            <span key={inventory._id} onClick={() => handlePrices(inventory._id)}
              className={`h-8 w-9 font-semibold text-xs flex items-center justify-center cursor-pointer productInputBorder rounded ${inventory._id === inventoryPrices.id ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {inventory.size}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-full p-2 flex flex-col productDetailBorder">
          <div className="flex flex-row px-2 py-3 items-center justify-between cursor-pointer" onClick={handleDetailToggle}>
            <span className="text-sm font-semibold opacity-70">Product Details</span>
            <span className="text-sm font-semibold opacity-70">{detailToggle ? 'Hide' : 'Show'}</span>
          </div>
          {detailToggle && (
            <div className="text-xs px-2 pb-3 opacity-70">
              {product?.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;