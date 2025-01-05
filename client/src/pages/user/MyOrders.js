import React, { Fragment, useEffect } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../actions/userActions';
import OrderStatusUpdate from '../../components/Order/OrderStatusUpdate';
import OrderStatus from '../../components/Order/OrderStatus';
import { FaCartPlus } from 'react-icons/fa6';
import MetaData from '../../components/layouts/MetaData';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { myorders = [], loading } = useSelector((state) => state.orderState);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    const renderSkeleton = () => (
        <div className='bg-gray-200 animate-pulse shadow-lg flex flex-row w-5/6 h-3/6 gap-5 py-2 px-5'>
            <div className='w-48 h-32 bg-gray-300 rounded-md'></div>
            <div className='h-full w-2/5 flex flex-col gap-3'>
                <div className='w-3/5 h-4 bg-gray-300 rounded-md'></div>
                <div className='w-full h-4 bg-gray-300 rounded-md'></div>
                <div className='w-2/4 h-4 bg-gray-300 rounded-md'></div>
                <div className='w-1/3 h-4 bg-gray-300 rounded-md'></div>
            </div>
            <div className='h-full w-1/5 flex flex-col justify-center'>
                <div className='w-1/2 h-4 bg-gray-300 rounded-md'></div>
            </div>
            <div className='h-full w-3/12 flex flex-col gap-2'>
                <div className='w-3/4 h-4 bg-gray-300 rounded-md'></div>
                <div className='w-1/2 h-4 bg-gray-300 rounded-md'></div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <MetaData title='MyOrders' />
            <div className='min-h-screen flex flex-col items-center mt-2 px-2'>
                <div className="w-full sm:w-4/6 text-center mb-8">
                    <h1 className="text-xl font-bold text-primary bg-white shadow-md py-2 rounded-lg flex flex-row justify-center items-center gap-2">
                        <FaCartPlus />
                        <span>My Orders</span>
                    </h1>
                </div>

                <div className='mt-2'></div>

                {loading ? (
                    Array(3)
                        .fill('')
                        .map((_, index) => <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>)
                ) : myorders.length === 0 ? (
                    <div className='h-96 flex flex-col items-center justify-center gap-6 text-center bg-gray-50'>
                        <div className='p-6 rounded-full bg-gradient-to-r from-teal-400 to-green-500 shadow-lg'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="w-16 h-16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 14l2-2 4 4m0 0l-4-4m4 4V7a1 1 0 00-1-1H7a1 1 0 00-1 1v8m4 4a4 4 0 100-8 4 4 0 000 8z"
                                />
                            </svg>
                        </div>
                        <div className='font-bold text-xl text-gray-700'>
                            You don't have any orders yet.
                        </div>
                        <Link
                            to='/products'
                            className='bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:from-teal-600 hover:to-blue-600 transition'
                        >
                            Shop Now
                        </Link>
                    </div>

                ) : (
                    myorders.map(order => (
                        <div className="bg-white shadow-lg flex flex-col lg:flex-row w-full lg:w-5/6 h-auto lg:h-3/6 gap-5 py-5 px-5 mt-2" key={order._id}>
                            <div className="w-full lg:w-48 h-32 mb-4 lg:mb-0">
                                <img src={order?.image} alt="" className="h-full w-full object-contain rounded-md" />
                            </div>

                            <div className="h-auto w-full lg:w-2/5 text-xs flex flex-col gap-3 font-light">
                                <span className="font-semibold text-gray-700">{order?.name}</span>
                                <span className="flex flex-wrap gap-2">
                                    <span className="font-semibold text-gray-700">Color :</span>
                                    <span className="capitalize">{order?.color}</span>
                                    <span className="font-semibold text-gray-700">Size :</span>
                                    <span>{order?.size}</span>
                                    <span className="font-semibold text-gray-700">Qty :</span>
                                    <span>{order?.quantity}</span>
                                </span>
                                <span className="flex flex-wrap gap-2">
                                    <span className="font-semibold text-gray-700">Status : </span>
                                    <OrderStatus status={order?.orderStatus?.status} />
                                </span>
                                <span className="flex flex-wrap gap-2 ">
                                    <Link to={`/myorders/orderdetails/${order?.orderId}/${order._id}`} className="text-white p-2 rounded font-semibold bg-primary">
                                        <span>
                                            View Details
                                        </span>
                                    </Link>
                                </span>
                            </div>

                            <div className="h-auto w-full lg:w-1/5 text-sm flex flex-row gap-2 justify-center lg:justify-start">
                                <span className='flex flex-row justify-center items-center'><FaRupeeSign /> {order?.price}</span>
                            </div>

                            <div className="h-auto w-full lg:w-3/12 flex flex-col gap-2 text-xs">
                                <OrderStatusUpdate status={order?.orderStatus?.status} date={order?.orderStatus?.updatedAt} />
                                <span>Your item has been {order?.orderStatus?.status}</span>
                                <Link to={`/product/reviews/${order?.product?._id}`}>
                                    <span className="text-primary font-bold">*Rate And Review Product</span>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Fragment>
    );
};

export default MyOrders;