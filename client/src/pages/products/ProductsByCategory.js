import React, { useEffect } from 'react'
import ProductCard from '../../components/Products/ProductCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByMainCategory } from '../../actions/productsActions'
import ProductLoading from '../../components/Products/ProductLoading'
import MetaData from '../../components/layouts/MetaData'
import { useAddToWishLists } from '../../hooks/useAddToWishLists'

const ProductsByCategory = () => {

  const dispatch = useDispatch()
  const { categoryId } = useParams()

  const { products = [], categoryName, productsLoading } = useSelector((state) => state.productsState)
  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists()


  useEffect(() => {
    dispatch(getProductsByMainCategory(categoryId))
  }, [dispatch, categoryId])

  return (
    <>
      <MetaData title={`${categoryName?.charAt(0).toUpperCase()}${categoryName?.slice(1)}`} />
      <div className='min-h-screen  w-full  lg:w-full sm:w-full mt-12 lg:mt-0 sm:mt-12 '>
        <div className='bg-white'>
          {products.length === 0 && !productsLoading && (
            <div className='h-screen flex flex-col items-center justify-center gap-3 opacity-70'>
              <div className='h-32 w-32'>
                <img src='/images/rejected.png' alt='no product found' className='w-full h-full object-contain' />
              </div>
              <div className='font-semibold opacity-70'>
                No Search Products Found
              </div>
            </div>
          )}
          {productsLoading && <ProductLoading />}
          {
            <ProductCard 
              products={products} 
              wishList = {wishList} 
              handleAddWishList={handleAddWishList} 
              handleRemoveWishList={handleRemoveWishList}
              user={user}
            />
          }
        </div>
      </div>
    </>
  )
}

export default ProductsByCategory;