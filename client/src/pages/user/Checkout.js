import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutItems } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getContentOptions } from '../../actions/websiteAction';
import MetaData from '../../components/layouts/MetaData';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showcontent = {} } = useSelector((state) => state.showcontentState);
  const { shippingInfo = {} } = useSelector((state) => state.cartState)
  const { products = [], priceDetails } = useSelector((state) => state.productsState);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isPaymentOptionsVisible, setIsPaymentOptionsVisible] = useState(false);

  useEffect(() => {
    setDisableButton(!selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  useEffect(() => {
    dispatch(checkOutItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContentOptions())
  }, [dispatch])

  const handlePlaceOrder = () => {
    navigate('/payment')
  }

  return (
    <Fragment>
      <MetaData title='Checkout Details' />
      <div className='relative min-h-screen w-full flex flex-col sm:flex-col lg:flex-row p-1 bg-gray-100'>
        <div className='w-full sm:w-full lg:w-4/6 py-3 px-0.5 sm:px-0.5 lg:px-2 flex flex-col gap-3'>

          <div className='font-bold text-md'>CheckOut Order Details</div>

          <span className='productInputBorder mb-3'></span>

          <div className='p-3 bg-white text-black font-bold rounded mb-2 text-sm h-auto w-full '>
            <div
              className='flex flex-row gap-2 items-center cursor-pointer '
              onClick={() => setIsLoginVisible(!isLoginVisible)}
            >
              <span className='px-2 rounded bg-primary text-white'>1</span>
              <span>Login</span>
              <span>{isLoginVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>

            {isLoginVisible && (
              <div className='opacity-75 mt-4 flex flex-row items-center justify-between gap-3 mx-5'>
                <span>Vasanth</span>
                <span className='text-green-500 font-bold'><TiTick color='green' /></span>
              </div>
            )}
          </div>

          <div className='p-3 bg-white text-black font-bold rounded mb-2 text-sm h-auto w-full'>
            <div
              className='flex flex-row gap-2 items-center cursor-pointer mt-1'
              onClick={() => setIsAddressVisible(!isAddressVisible)}
            >
              <span className='px-2 rounded bg-primary text-white'>2</span>
              <span>Delivery Address</span>
              <span>{isAddressVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>

            {isAddressVisible && (
              <div className='mx-5 opacity-75 mt-4 flex flex-row justify-between'>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold ">
                    Phone : {shippingInfo?.phoneNo}
                  </span>
                  <span className="font-semibold">
                    {shippingInfo?.address}
                  </span>
                  <span className="font-semibold">
                    {shippingInfo?.city}
                  </span>
                  <span className="font-semibold">
                    {shippingInfo?.state} - {shippingInfo?.postalCode}
                  </span>
                  <span className="font-semibold">
                    {shippingInfo?.country}
                  </span>
                </div>
                <span className='text-green-500 font-bold'><TiTick color='green' /></span>
              </div>
            )}
          </div>


          <div className='p-3 bg-white text-black font-bold rounded text-sm mb-2 h-auto w-full'>
            <div
              className='flex flex-row gap-2 items-center cursor-pointer mt-1'
              onClick={() => setIsOrderVisible(!isOrderVisible)}
            >
              <span className='px-2 rounded bg-primary text-white'>3</span>
              <span>Order Summary</span>
              <span>{isOrderVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>


            {isOrderVisible && products && products?.map((item, index) => (
              <div key={index} className='flex flex-row bg-gray-100 p-2 gap-2 sm:gap-2 lg:gap-3 mt-5 shadow-lg rounded '>
                <div className='w-40 sm:w-40 lg:w-32  h-28 bg-white p-1 shadow-md rounded'>
                  <img src={item.image} alt={item.name} className='w-full h-full rounded object-contain text-xs sm:text-xs lg:text-xs' />
                </div>
                <div className='relative w-full flex flex-col gap-2'>
                  <div className='text-xs sm:text-xs lg:text-sm font-semibold'>{item.name}</div>
                  <div className='text-xs flex flex-col gap-2'>
                    <div><span className='font-bold opacity-80'>Size</span> : <span>{item.size}</span></div>
                    <div><span className='font-bold opacity-80'>Qty</span> : <span>{item.qty}</span></div>
                    <div><span className='font-bold opacity-80'>Price</span> : <span>{item.finalPrice} Per Qty</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='p-3 bg-white text-black font-bold rounded mb-2 text-sm h-auto w-full'>
            <div
              className='flex flex-row gap-2 items-center cursor-pointer'
              onClick={() => setIsPaymentOptionsVisible(!isPaymentOptionsVisible)}
            >
              <span className='px-2 rounded bg-primary text-white'>4</span>
              <span>Payment Options</span>
              <span>{isPaymentOptionsVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>

            {isPaymentOptionsVisible && (
              <div className='w-full h-auto mt-5 mx-5 flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Phone Pay"
                    checked={selectedPaymentMethod === 'Phone Pay'}
                    onChange={() => setSelectedPaymentMethod('Phone Pay')}
                    className='cursor-pointer'
                  />
                  <span className='font-semibold'>Online</span>
                </div>

                {showcontent?.codOptionDisplay &&
                  <div className='flex flex-row gap-2'>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash On Delivery"
                      checked={selectedPaymentMethod === 'Cash On Delivery'}
                      onChange={() => setSelectedPaymentMethod('Cash On Delivery')}
                      className='cursor-pointer'
                    />
                    <span className='font-semibold'>Cash On Delivery</span>
                  </div>}
              </div>
            )}
          </div>
        </div>


        <div className='relative sm:relative  lg:fixed flex flex-col p-2 gap-4 right-1 h-80 w-full sm:w-full lg:w-1/4 bg-white text-black rounded'>

          <div className='uppercase px-5  rounded p-2 font-bold  mb-1'>
            Price Details
            <div className="productDetailBorder mt-2"></div>
          </div>

          <div className='w-full flex flex-col px-5 gap-5 items-center'>
            {priceDetails?.map((item, index) => (
              <div className='w-full flex flex-row justify-between' key={index}>
                <div className='text-right font-semibold text-sm'>{item.name}</div>
                <div className={`${item.color} font-semibold text-left w-20 flex flex-row gap-1 text-sm`}>
                  <span>Rs.</span>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={!disableButton ? handlePlaceOrder : null}
            className={`absolute bottom-2 cursor-pointer w-full p-2 uppercase justify-center items-center left-1 font-bold text-center rounded right-0
          ${disableButton ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white'}`}
            style={{ pointerEvents: disableButton ? 'none' : 'auto' }}
          >
            Continue
          </div>

        </div>

      </div>
    </Fragment>
  );
};

export default Checkout;
