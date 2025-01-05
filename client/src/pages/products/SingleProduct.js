import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layouts/Footer";
import ProductCard from "../../components/Products/ProductCard";
import ProductComments from "../../components/Products/ProductComments";
import ImagesCard from "../../components/singleProduct/ImagesCard";
import ProductDetails from "../../components/singleProduct/ProductDetails";
import { useEffect, useState } from "react";
import { getSingleProducts } from "../../actions/productsActions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCartItem } from "../../actions/cartAction";
import MetaData from "../../components/layouts/MetaData";
import { useAddToWishLists } from "../../hooks/useAddToWishLists";
import ProductLoading from "../../components/Products/ProductLoading";


const SingleProduct = () => {

  const { wishList = [], handleAddWishList, handleRemoveWishList, user } = useAddToWishLists()
  const { productId, productCode, productName } = useParams()
  const dispatch = useDispatch()
  const { product = {}, error, loading } = useSelector((state) => state.productState)
  const { viewedProducts = [], loading: viewedProductLoading } = useSelector((state) => state.viewedProductsState)
  const [productItemSize, setProductItemSize] = useState('');


  const handleAddToCart = () => {
    const carts = `${productId}|${productItemSize}`
    dispatch(addCartItem(carts));
  };

  const isWishListed = Array.isArray(wishList) && wishList.some(item => item._id === productId);

  useEffect(() => {
    toast(error, {
      type: 'error',
      position: 'bottom-center'
    })
  }, [error])


  useEffect(() => {

    dispatch(getSingleProducts(productId, productCode, productName))
    let recentProducts = JSON.parse(localStorage.getItem('recent')) || []

    if (!recentProducts.includes(productId)) {
      recentProducts = [...recentProducts, productId]
    }

    if (recentProducts.length > 6) {
      recentProducts.shift()
    }

    localStorage.setItem('recent', JSON.stringify(recentProducts))

  }, [dispatch, productId, productCode, productName])

  return (
    <>
      <MetaData title={`${product?.name}`} description={`${product?.description}`} />
      <div className="min-h-screen flex-col bg-white">

        {
          product &&
          <div className="flex flex-col p-2 lg:flex-row">
            <div className="lg:w-3/6 sm:w-full sticky lg:sticky sm:relative lg:top-0 min-h-auto sm:min-h-auto lg:h-screen bg-white shadow-lg my-2">
              <ImagesCard images={product?.images} handleAddToCart={handleAddToCart} isLoading={loading}/>
            </div>
            <div className="lg:w-4/6 sm:w-full flex flex-col">
              <div className="w-full h-auto overflow-y-auto  p-1 lg:p-5 sm:p-1">
                <ProductDetails
                  isWishListed={isWishListed}
                  wishList={wishList}
                  user={user}
                  handleAddWishList={handleAddWishList}
                  handleRemoveWishList={handleRemoveWishList}
                  setProductItemSize={setProductItemSize}
                  product={product}
                  productId={productId}
                  isLoading={loading}
                />
              </div>

              <div className="lg:w-full sm:w-full h-auto overflow-y-auto p-1 lg:p-5 sm:p-1">
                <ProductComments
                  product={product}
                  productId={productId}
                />
              </div>
            </div>
          </div>
        }


        {
          viewedProducts?.length > 0 &&
          <div className="px-2 my-8">
            <div className="font-bold opacity-80 text-xl capitalize mb-2 text-primary">
              Recently Viewed By You
            </div>
            {
              viewedProductLoading && <ProductLoading />
            }
            {
              !viewedProductLoading &&
              <ProductCard
                products={viewedProducts}
                wishList={wishList}
                handleAddWishList={handleAddWishList}
                handleRemoveWishList={handleRemoveWishList}
                user={user}
              />
            }
          </div>
        }
        <Footer />
      </div>
    </>
  );
}

export default SingleProduct;
