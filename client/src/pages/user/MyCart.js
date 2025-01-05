import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../actions/cartAction';
import { toast } from 'react-toastify';
import { clearItemsMessage } from '../../slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import usePriceDetails from '../../hooks/usePriceDetails';
import OrderProductsCard from '../../components/Products/OrderProductsCard';
import useCart from '../../hooks/useCart';
import PriceDetails from '../../components/Products/PriceDetails';
import DeliveryChargeDetails from '../../components/Order/DeliveryChargeDetails';
import MetaData from '../../components/layouts/MetaData';

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeliveryCharge, setShowDeliveryCharge] = useState(false)
  const [productId, setProductId] = useState(null)

  const {
    isRemoved,
    products = [],
    quantities,
    handleAddQty,
    handleSubQty,
    handleRemoveItem,
    loading
  } = useCart();

  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);

  const priceDetailsCalculation = usePriceDetails(products, quantities, shippingInfo);

  const isShippingInfo =
    shippingInfo.address &&
    shippingInfo.city &&
    shippingInfo.state &&
    shippingInfo.postalCode;

  const priceDetails = useMemo(
    () => [
      { name: 'Price', value: priceDetailsCalculation.price.toFixed(2), color: 'line-through' },
      { name: 'Discount Price', value: priceDetailsCalculation.totalPrice.toFixed(2) },
      { name: 'Savings', value: priceDetailsCalculation.savings.toFixed(2) },
      { name: 'Delivery Charge', value: priceDetailsCalculation.deliveryCharge.toFixed(2) },
      { name: 'Total Payable', value: priceDetailsCalculation.total.toFixed(2) },
    ],
    [priceDetailsCalculation]
  );

  const handleShowDeliveryCharge = (id) => {
    setProductId(id);
    setShowDeliveryCharge(true);
  };

  const handlePlaceOrder = () => {
    const productData = products.map((item) => {
      const key = `${item.productId}|${item.size}`;

      return {
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        qty: quantities[key] ? quantities[key] : 1,
        shippingFrom: item.shippingFrom,
        finalPrice: item.finalPrice,
      };
    });

    const data = {
      products: productData,
      priceDetails,
    };

    sessionStorage.setItem('PlaceOrder', JSON.stringify(data));

    if (
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.country &&
      shippingInfo.phoneNo &&
      shippingInfo.postalCode
    ) {
      navigate('/checkout');
    } else {
      navigate('/shipping');
    }
  };

  useEffect(() => {
    if (isRemoved) {
      toast('Item Removed From Cart', {
        type: 'info',
        position: 'bottom-center',
        onOpen: () => dispatch(clearItemsMessage()),
      });
    }

    dispatch(getCartItems());
  }, [dispatch, isRemoved]);

  return (
    <Fragment>
      <MetaData title='MyCart' />
      <div className="relative min-h-screen w-full flex flex-col sm:flex-col lg:flex-row p-1 bg-gray-100">
        <div className="w-full sm:w-full lg:w-9/12 py-3 px-1 sm:px-1 lg:px-2">
          <div className="bg-white w-full h-auto p-2 text-sm flex flex-row justify-between px-5 mb-5">
            <div className="flex flex-col gap-3 justify-center capitalize">
              <div>
                <span className="font-semibold opacity-70">Deliver to : </span>
                <span className="font-bold ">
                  <span>{user?.name}</span>
                  {isShippingInfo && <span>, {shippingInfo?.postalCode}</span>}
                </span>
              </div>

              {isShippingInfo && (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold opacity-60">Phone: {shippingInfo?.phoneNo}</span>
                  <span className="font-semibold opacity-60">{shippingInfo?.address}</span>
                  <span className="font-semibold opacity-60">{shippingInfo?.city}</span>
                  <span className="font-semibold opacity-60">
                    {shippingInfo?.state} - {shippingInfo?.postalCode}
                  </span>
                  <span className="font-semibold opacity-60">{shippingInfo?.country}</span>
                </div>
              )}
            </div>
            <Link to="/shipping" className="flex flex-row items-center justify-center">
              <span className="text-primary font-semibold p-2 productInputBorder rounded">
                {isShippingInfo ? 'Change' : 'Update'}
              </span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="w-full flex flex-col items-center h-screen bg-white">
              <img
                src="/images/cart.svg" 
                alt="Empty Cart"
                className="w-40 h-40 sm:w-52 sm:h-52"
              />
              <div className="text-center font-semibold text-gray-700 py-5">
                No items found in your cart.
              </div>
              <button
                onClick={() => navigate("/products")}
                className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition"
              >
                Shop Now
              </button>
            </div>
          ) : loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-row bg-gray-200 animate-pulse p-3 mb-3 gap-3 shadow-lg rounded"
              >
                <div className="w-4/6 sm:w-4/6 lg:w-3/6 h-40 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            <OrderProductsCard
              isTrue={true}
              products={products}
              handleAddQty={handleAddQty}
              handleSubQty={handleSubQty}
              quantities={quantities}
              handleRemoveItem={handleRemoveItem}
              handleShowDeliveryCharge={handleShowDeliveryCharge}
            />
          )}


        </div>
        <PriceDetails
          navigate={navigate}
          dispatch={dispatch}
          shippingInfo={shippingInfo}
          text="Place Order Items"
          priceDetails={priceDetails}
          handlePlaceOrder={handlePlaceOrder}
          products={products}
        />

        <div className="absolute w-11/12">
          {showDeliveryCharge && (
            <DeliveryChargeDetails
              products={products}
              productId={productId}
              shippingInfo={shippingInfo}
              setShowDeliveryCharge={setShowDeliveryCharge}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MyCart;