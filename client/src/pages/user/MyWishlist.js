import { FaRupeeSign, FaTrash, FaStar, FaHeart } from 'react-icons/fa';
import women1 from '../../utils/images/women1.jpg';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishList, removeWishList } from '../../actions/productsActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearWishList } from '../../slices/wishListSlice';
import MetaData from '../../components/layouts/MetaData';

const MyWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishList = [], isRemovedToWishList, loading } = useSelector((state) => state.wishListState);

  const handleRemoveWishList = (id) => {
    dispatch(removeWishList(id));
  };

  useEffect(() => {
    if (isRemovedToWishList) {
      toast('Product Removed From WishList', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearWishList()),
      });
    }
    dispatch(getWishList());
  }, [dispatch, isRemovedToWishList]);

  const SkeletonLoader = () => (
    <div className="w-full bg-white shadow-lg rounded-lg flex p-4 items-center gap-5 mb-6 animate-pulse">
      <div className="w-40 h-40 bg-gray-200 rounded-md"></div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 w-1/3"></div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <MetaData title='MyWishList' />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-10 px-2">
        <div className="w-full sm:w-4/6 text-center mb-8">
          <h1 className="text-xl font-bold text-gray-800 bg-white shadow-md py-2 rounded-lg flex flex-row justify-center items-center gap-2">
            <FaHeart color="red" />
            <span className="text-primary">My Wishlist ({wishList.length})</span>
          </h1>
        </div>

        {loading ? (
          Array(3).fill(null).map((_, index) => <SkeletonLoader key={index} />)
        ) : wishList.length > 0 ? (
          wishList.map((item) => (
            <div
              key={item._id}
              className="w-full sm:w-4/6 bg-white shadow-lg rounded-lg flex p-4 items-center gap-5 mb-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-40 h-40 overflow-hidden rounded-md">
                <img
                  src={item?.images[0]?.image || women1}
                  alt="Wishlist Item"
                  className="w-full h-full object-contain transform transition-transform hover:scale-110"
                />
              </div>

              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name || 'Product Name'}
                  </h2>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="mr-1" />
                    <span>{item?.ratings || 'No Ratings'}</span>
                  </div>
                </div>

                <div className="text-xl font-bold text-gray-900 flex items-center mt-4">
                  <FaRupeeSign className="mr-1" />
                  <span>{item.price || '499'}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <button
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => navigate(`/product/${item.name.replace(/\s+/g, '-').toLowerCase()}/${item?.productCode}/${item?._id}`)}
                >
                  View Details
                </button>

                <button
                  title="Remove from Wishlist"
                  className="p-3 bg-red-100 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  onClick={() => handleRemoveWishList(item._id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full sm:w-4/6 flex flex-col items-center mt-10">
      <img 
        src="/images/wishlist.svg" 
        alt="Empty Wishlist" 
        className="w-32 h-32 sm:w-40 sm:h-40 mb-6" 
      />
      <div className="text-center font-semibold text-gray-700">
        Your wishlist is empty. Start adding your favorite items!
      </div>
      <button 
        className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition"
        onClick={() => navigate('/products')}
      >
        Browse Products
      </button>
    </div>
        )}
      </div>
    </Fragment>
  );
};

export default MyWishlist;