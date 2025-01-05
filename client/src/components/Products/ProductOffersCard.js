import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffersProduct } from '../../actions/productsActions';
import ProductCardHome from './ProductCardHome';
import { Link } from 'react-router-dom';

const ProductOffersCard = () => {
  const { products = [], loading } = useSelector(state => state.productsOffersState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffersProduct());
  }, [dispatch]);

  return (
    <div className='min-h-screen w-full flex flex-col justify-center md:items-center gap-5 px-2'>
      {loading ? (
        <div className='flex flex-wrap gap-4 justify-between'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
              <div className='bg-gray-300 h-64 rounded-lg animate-pulse'>
                <div className='w-3/4 h-8 bg-gray-400 mt-4 mb-3 mx-auto'></div>
                <div className='w-full h-24 bg-gray-400'></div>
                <div className='w-2/4 h-6 bg-gray-400 mt-4 mx-auto'></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap gap-4 justify-between animate-fadeIn'>
          <ProductCardHome wishList={false} products={products} offers={true} />
        </div>
      )}

      <div className='w-full flex justify-center items-center'>
        <span className='text-center px-5 py-3 text-sm bg-gradient-to-tr from-green-400 to-green-800 text-white font-semibold rounded-md'>
         <Link to='/offers'>
           View Offers
         </Link>
        </span>
      </div>
    </div>
  );
};

export default ProductOffersCard;
