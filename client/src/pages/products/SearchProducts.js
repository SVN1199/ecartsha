import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCard from '../../components/Products/ProductCard';
import ProductLoading from '../../components/Products/ProductLoading';
import { getSearchProducts } from '../../actions/productsActions';
import { clearProductsError } from '../../slices/productsSlice';
import { useAddToWishLists } from '../../hooks/useAddToWishLists';
import MetaData from '../../components/layouts/MetaData';

const SearchProducts = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { products = [], loading: productsLoading, error } = useSelector((state) => state.productsState);
  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists();

  useEffect(() => {
    if (keyword) dispatch(getSearchProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        onClose: () => dispatch(clearProductsError()),
      });
    }
  }, [error, dispatch]);

  const renderContent = () => {
    if (productsLoading) return <ProductLoading />;

    if (products.length === 0) {
      return (
        <div className="h-screen flex flex-col items-center justify-center gap-3 opacity-70">
          <img
            src="/images/rejected.png"
            alt="No product found"
            className="h-32 w-32 object-contain"
          />
          <div className="font-semibold opacity-70">No Search Products Found</div>
        </div>
      );
    }

    return (
      <ProductCard
        products={products}
        wishList={wishList}
        handleAddWishList={handleAddWishList}
        handleRemoveWishList={handleRemoveWishList}
        user={user}
      />
    );
  };

  return (
   <Fragment>
   <MetaData title={keyword ? `Search Results for "${keyword}"` : 'Search'} />
     <div className="min-h-screen w-full mt-4">
      <div className="bg-white">{renderContent()}</div>
    </div>
   </Fragment>
  );
};

export default SearchProducts;
