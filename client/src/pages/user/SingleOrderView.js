import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSingleProductOrder } from '../../actions/orderActions';
import { toast } from 'react-toastify';
import { clearError } from '../../slices/orderSlice';
import OrderTracker from '../../components/Order/OrderTracker';
import FormatDate from '../../components/layouts/FormatDate';
import { FaStar } from 'react-icons/fa';
import ReturnExpires from '../../components/Order/ReturnExpires';

const SingleOrderView = () => {
    const dispatch = useDispatch();
    const { orderId, singleOrderId } = useParams();

    const { singleOrder: order = {}, error } = useSelector((state) => state.orderState);

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: 'bottom-center',
                onOpen: () => dispatch(clearError()),
            });
        }
    }, [dispatch, error]);

    useEffect(()=>{
        dispatch(getSingleProductOrder(orderId, singleOrderId));
    },[orderId, singleOrderId, dispatch])

    return (
        <div className="px-3 flex justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col w-full sm:w-4/6 gap-2 my-4 bg-white shadow-md rounded-lg">
            <div className="font-semibold my-4 text-md text-green-800 px-5">
                <div>
                    <span>OrderId :</span> {order?.orderId}
                </div>
                <div>
                    <span>ProductId :</span> {order?.singleOrderItem?.product?._id}
                </div>
            </div>
    
            <div className="bg-white p-5 border-b">
                <div className="flex flex-col gap-2 text-sm">
                    <div className="font-semibold text-lg">Delivery Address</div>
                    <div className="text-gray-700">{order?.user?.name}</div>
                    <div className="flex flex-col gap-1 text-gray-700">
                        <span>{order?.shippingInfo?.address}</span>
                        <span>{order?.shippingInfo?.city}</span>
                        <span>{order?.shippingInfo?.country}</span>
                        <span>{order?.shippingInfo?.postalCode}</span>
                    </div>
                    <div className="text-sm flex flex-row gap-4">
                        <span className="font-semibold text-gray-700">Phone Number</span>
                        <span className="font-semibold text-gray-700">-</span>
                        <span className="text-gray-700">{order?.shippingInfo?.phoneNo}</span>
                    </div>
                </div>
            </div>
    
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 text-sm border-b">
                <div className="h-32 w-32 p-2 rounded border shadow-sm flex justify-center items-center">
                    <img
                        src={order?.singleOrderItem?.image}
                        alt={order?.singleOrderItem?.name}
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="w-full sm:w-4/6 flex flex-col gap-5">
                    <div className="text-md font-semibold text-gray-700">{order?.singleOrderItem?.name}</div>
                    
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex flex-row w-full">
                            <span className="font-semibold text-gray-700 w-1/3">Size</span>
                            <span className="font-semibold text-gray-700 w-1/3">:</span>
                            <span className="w-1/3 text-start">{order?.singleOrderItem?.size}</span>
                        </div>
                        <div className="flex flex-row w-full">
                            <span className="w-1/3 font-semibold text-gray-700">Quantity</span>
                            <span className="w-1/3 font-semibold text-gray-700">:</span>
                            <span className="w-1/3 text-start">{order?.singleOrderItem?.quantity}</span>
                        </div>
                        <div className="flex flex-row w-full">
                            <span className="w-1/3 font-semibold text-gray-700">Price</span>
                            <span className="w-1/3 font-semibold text-gray-700">:</span>
                            <span className="w-1/3 text-start">Rs.{order?.singleOrderItem?.price}</span>
                        </div>
                    </div>
    
                    <OrderTracker status={order?.orderStatus?.status} date={order?.orderStatus?.updatedAt} />
    
                    <Link
                        className="text-right p-2 text-xs flex flex-row items-center gap-2 justify-end"
                        to={`/product/reviews/${order?.singleOrderItem?.product?._id}`}
                    >
                        <span className="text-primary font-bold">
                            <FaStar />
                        </span>
                        <span className="text-primary font-bold">Rate And Review Product</span>
                    </Link>
    
                    <ReturnExpires
                        created={order?.createdAt}
                        expiresTo={order?.singleOrderItem?.product?.returnPolicy?.expires}
                        available={order?.singleOrderItem?.product?.returnPolicy?.available}
                        orderId={order?.orderId}
                        singleOrderId={order?.singleOrderItem?._id}
                    />
                </div>
            </div>
    
            <div className="flex flex-col gap-2 bg-white p-5 text-sm border-b">
                <div className="flex flex-row w-full sm:w-4/6 justify-between">
                    <span className="w-full font-bold text-gray-700">Payment Status</span>
                    <span className="w-full text-center font-bold text-gray-700">:</span>
                    <span className="w-full font-bold text-gray-700 capitalize">{order?.paymentInfo?.payInfoStatus}</span>
                </div>
                <div className="flex flex-row w-full sm:w-4/6 justify-between">
                    <span className="w-full font-bold text-gray-700">Order At</span>
                    <span className="w-full font-bold text-gray-700 text-center">:</span>
                    <span className="w-full font-bold text-gray-700">
                        <FormatDate date={order?.createdAt} />
                    </span>
                </div>
                <div className="flex flex-row w-full sm:w-4/6 justify-between">
                    <span className="w-full font-bold text-gray-700">Paid At</span>
                    <span className="w-full font-bold text-gray-700 text-center">:</span>
                    <span className="w-full font-bold text-gray-700">
                        <FormatDate date={order?.paymentInfo?.paidAt} />
                    </span>
                </div>
            </div>
            <div className="flex flex-col mt-3 text-sm p-5 font-semibold text-gray-800">
                <span><b>Note : </b></span>
                <span>
                    This is one of the orders you placed from the items in your cart at the time of ordering.
                </span>
            </div>
        </div>
    </div>
    
    );
};

export default SingleOrderView;
