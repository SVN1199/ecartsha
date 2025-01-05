import React, { Fragment, useEffect } from 'react'
import ProductCard from '../../components/Products/ProductCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryProducts } from '../../actions/productsActions'
import ProductLoading from '../../components/Products/ProductLoading'
import { toast } from 'react-toastify'
import { useAddToWishLists } from '../../hooks/useAddToWishLists'
import MetaData from '../../components/layouts/MetaData'

const CategoryProducts = () => {

  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists()
  const { products = [], productsLoading, error } = useSelector((state) => state.productsState)

  useEffect(() => {
    dispatch(getCategoryProducts(categoryId))
  }, [dispatch, categoryId])


  useEffect(() => {
    toast(error, {
      type: 'error',
      position: 'bottom-center'
    })
  }, [error])

  return (
 <Fragment>
 <MetaData title={`Category Products - Explore Items in ${categoryId}`} />
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
            wishList={wishList}
            handleAddWishList={handleAddWishList}
            handleRemoveWishList={handleRemoveWishList}
            user={user}
          />
        }
      </div>
    </div>
 </Fragment>
  )
}

export default CategoryProducts