import React, { useCallback, useEffect, useState } from 'react'
import ProductSideBar from '../../components/Products/ProductSideBar'
import ProductCard from '../../components/Products/ProductCard'
import Footer from '../../components/layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { getFilterProducts, getProducts } from '../../actions/productsActions'
import { getCategories } from '../../actions/categoriesActions'
import ProductLoading from '../../components/Products/ProductLoading'
import MetaData from '../../components/layouts/MetaData'
import { useAddToWishLists } from '../../hooks/useAddToWishLists'

const Products = () => {
  const dispatch = useDispatch()
  const { products = [], totalPages = 1, loading: productsLoading } = useSelector((state) => state.productsState)
  const { categories = [], productPrice = {}, loading: categoriesLoading } = useSelector((state) => state.categoriesState)
  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists()
  const { viewedProducts = [] } = useSelector((state) => state.viewedProductsState)
  const [page, setPage] = useState(1)
  const [filterPage, setFilterPage] = useState()
  const [price, setPrice] = useState([0, 0])
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleFilterPage = () => {
    setFilterPage(!filterPage)
  }

  const handlePageChange = (direction) => {
    if (direction === 'prev' && page > 1) {
      setPage((prev) => prev - 1)
    } else if (direction === 'next' && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const clearFilter = () => {
    if (!selectedCategories) {
      return
    }
    dispatch(getProducts(page))
    setSelectedCategories([])
  }

  const handleSelectCategory = useCallback((id, isChecked) => {
    setSelectedCategories((prevState) => {
      let updatedCategories
      if (isChecked) {
        updatedCategories = [...prevState, id]
      } else {
        updatedCategories = prevState.filter((categoryId) => categoryId !== id)
      }
      return updatedCategories
    })
  }, [])

  const submitFilter = () => {
    const [minPrice, maxPrice] = price
    const category = selectedCategories.join(',')
    dispatch(getFilterProducts(minPrice, maxPrice, category))
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProducts(page))
  }, [dispatch, page])

  return (
    <div>
      <MetaData title="Products" />
      <div className="min-h-screen flex flex-col lg:flex-row sm:flex-col gap-2 p-0 lg:p-2 sm:p-0 bg-white lg:bg-gray-100 smL:bg-white">
        <div className="w-full fixed z-100 flex flex-row justify-between bg-white p-3 lg:p-2 sm:p-3 lg:hidden sm:block font-semibold text-sm text-primary">
          <div
            className="w-full flex flex-row justify-end items-center gap-2"
            onClick={handleFilterPage}>
            <span>
              <FaFilter />
            </span>
            <span>Filters</span>
          </div>
        </div>
        {filterPage && (
          <div className="w-full lg:w-3/12 sm:w-4/6 block lg:hidden sm:block">
            <ProductSideBar
              clearFilter={clearFilter}
              setPrice={setPrice}
              submitFilter={submitFilter}
              handleSelectCategory={handleSelectCategory}
              categories={categories}
              productPrice={productPrice}
              handleFilterPage={handleFilterPage}
              loading={categoriesLoading}
            />
          </div>
        )}
        <div className="w-5/6 lg:w-3/12 top-0 sm:w-4/6 hidden lg:block sm:hidden">
          <ProductSideBar
            clearFilter={clearFilter}
            setPrice={setPrice}
            submitFilter={submitFilter}
            handleSelectCategory={handleSelectCategory}
            productPrice={productPrice}
            categories={categories}
            loading={categoriesLoading}
          />
        </div>
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
          {products.length > 0 && (
            <div className="w-full flex items-center justify-center p-5 gap-4">
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded disabled:opacity-50"
                onClick={() => handlePageChange('prev')}
                disabled={page === 1}>
                Prev
              </button>
              <span className="font-semibold text-primary">Page {page}</span>
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded disabled:opacity-50"
                onClick={() => handlePageChange('next')}
                disabled={page === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>

    {
      viewedProducts?.length > 0 &&
      <div className="px-2 my-8">
          <div className="font-bold text-xl capitalize mb-2 text-primary">
            Recently Viewed By You
          </div>
          <ProductCard
            products={viewedProducts}
            wishList={wishList}
            handleAddWishList={handleAddWishList}
            handleRemoveWishList={handleRemoveWishList}
            user={user}
          />
        </div>
    }
      <Footer />
    </div>
  )
}

export default Products