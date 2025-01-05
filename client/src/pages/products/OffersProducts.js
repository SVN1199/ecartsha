import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOffersProduct } from '../../actions/productsActions'
import ProductLoading from '../../components/Products/ProductLoading'
import { useAddToWishLists } from '../../hooks/useAddToWishLists'
import ProductCard from '../../components/Products/ProductCard'
import MetaData from '../../components/layouts/MetaData'

const OffersProducts = () => {

  const dispatch = useDispatch()

  const { products = [], loading: productsLoading } = useSelector((state) => state.productsOffersState)
  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists()

  useEffect(() => {
    dispatch(getOffersProduct())
  }, [dispatch])

  return (
    <Fragment>
      <MetaData title='Product Offers' />
      <div className="min-h-screen w-full lg:w-11/12 sm:w-full mt-12 lg:mt-0 sm:mt-12">
        <div className="bg-white">
          {products.length === 0 && !productsLoading && (
            <div className="h-screen flex flex-col items-center justify-center gap-3 opacity-70">
              <div className="h-32 w-32">
                <img
                  src="/images/rejected.png"
                  alt="no product found"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="font-semibold opacity-70">No Products Found</div>
            </div>
          )}
          {productsLoading && <ProductLoading />}
          {
            <ProductCard
              user={user}
              products={products}
              handleAddWishList={handleAddWishList}
              handleRemoveWishList={handleRemoveWishList}
              wishList={wishList}
            />
          }
        </div>

      </div>
    </Fragment>
  )
}

export default OffersProducts