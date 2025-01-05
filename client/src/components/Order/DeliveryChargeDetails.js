import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistancePrice } from '../../actions/ShippingPriceAction';

const DeliveryChargeDetails = ({ productId, products, shippingInfo, setShowDeliveryCharge }) => {
    const dispatch = useDispatch();

    const { shippingPrices = [], error } = useSelector((state) => state.shippingPricesState);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => (degree * Math.PI) / 180;
        const R = 6371; 

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const getProduct = Array.isArray(products)
        ? products.find((product) => product.productId === productId)
        : null;

    const userLatLong = getProduct?.shippingFrom?.location;
    const productLatLong = shippingInfo?.position;

    const distance = userLatLong && productLatLong
        ? calculateDistance(userLatLong.latitude, userLatLong.longitude, productLatLong[0], productLatLong[1])
        : null;

    useEffect(() => {
        if (distance !== null && shippingPrices.length > 0) {
            const matchingPrice = shippingPrices.find(item =>
                distance >= item?.distanceStart && distance <= item?.distanceEnd
            );

            if (matchingPrice) {
                setDeliveryCharge(matchingPrice?.distancePrice);
            } else {
                setDeliveryCharge(0);
            }
        }
    }, [distance, shippingPrices]);

    useEffect(() => {
        dispatch(getDistancePrice());
    }, [dispatch]);

    return (
        <div className="w-full h-screen fixed flex justify-center">
            <div className="absolute inset-0 bg-gray-400 opacity-30"></div>
            <div className="relative bg-white p-4 w-96 h-96 rounded shadow-lg">
                <h2 className="text-lg font-semibold text-gray-600 text-center">Delivery Charge Details</h2>
                <div className="mt-4">
                    {getProduct ? (
                        <div className="w-full flex flex-col gap-2 ml-3">
                            <p className="font-semibold text-blue-800">{getProduct.name}</p>
                            <p className="flex justify-between capitalize">
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Price</span>
                                <span className='w-full font-bold text-gray-800 opacity-90 text-center text-sm'>:</span>
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Rs.{getProduct.price}</span>
                            </p>
                            <p className="flex justify-between capitalize">
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Shipping From</span>
                                <span className='w-full font-bold text-gray-800 opacity-90 text-center text-sm'>:</span>
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">{getProduct.shippingFrom.placeName}</span>
                            </p>
                            <p className="flex justify-between capitalize">
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Delivery To</span>
                                <span className='w-full font-bold text-gray-800 opacity-90 text-center text-sm'>:</span>
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">{shippingInfo?.city}</span>
                            </p>
                            <p className="flex justify-between capitalize">
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Distance</span>
                                <span className='w-full font-bold text-gray-800 opacity-90 text-center text-sm'>:</span>
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">
                                    {distance ? `${distance.toFixed(2)} km` : "N/A"}
                                </span>
                            </p>
                            <p className="flex justify-between capitalize">
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Delivery Charge</span>
                                <span className='w-full font-bold text-gray-800 opacity-90 text-center text-sm'>:</span>
                                <span className="w-full font-bold text-gray-800 opacity-90 text-sm">Rs.{deliveryCharge}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-red-500">Product not found</p>
                    )}
                </div>
                <button
                    onClick={() => setShowDeliveryCharge(false)}
                    className="absolute bottom-1 right-1 bg-red-600 px-2 py-1 rounded text-white text-sm"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DeliveryChargeDetails;