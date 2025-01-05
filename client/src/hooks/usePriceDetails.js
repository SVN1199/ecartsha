import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDistancePrice } from '../actions/ShippingPriceAction';

const usePriceDetails = (products = [], quantities = {}, shippingInfo = {}) => {
  const { shippingPrices = [] } = useSelector((state) => state.shippingPricesState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistancePrice());
  }, [dispatch]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;

    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return {
        price: 0,
        totalPrice: 0,
        savings: 0,
        total: 0,
        deliveryCharge: 0,
      };
    }

    const addedDeliveryCharges = new Set();

    return products.reduce(
      (acc, product) => {
        const quantity = quantities[`${product.productId}|${product.size}`] || 1;

        if (!product || product.qty === 0) {
          return acc;
        }

        const productPrice = product.price * quantity;
        const productFinalPrice = product.finalPrice * quantity;

        const locationKey = JSON.stringify(product.shippingFrom?.location);
        if (!locationKey) {
          console.warn(`Product ${product.productId} has missing shipping location data.`);
          return acc;
        }

        const location = product.shippingFrom?.location || {};
        const { latitude, longitude } = location;
        const position = shippingInfo?.position || [];
        const [userLat, userLong] = position;

        const distance = calculateDistance(latitude, longitude, userLat, userLong);

        const priceInfo = shippingPrices.find(
          (price) => distance >= price.distanceStart && distance <= price.distanceEnd
        );
        const distancePrice = priceInfo ? priceInfo.distancePrice : 0;

        const productDeliveryCharge = addedDeliveryCharges.has(locationKey)
          ? 0
          : distancePrice;

        addedDeliveryCharges.add(locationKey);

        return {
          price: acc.price + productPrice,
          totalPrice: acc.totalPrice + productFinalPrice,
          savings: acc.savings + (productPrice - productFinalPrice),
          total: acc.total + productFinalPrice + productDeliveryCharge,
          deliveryCharge: acc.deliveryCharge + productDeliveryCharge,
        };
      },
      {
        price: 0,
        totalPrice: 0,
        savings: 0,
        total: 0,
        deliveryCharge: 0,
      }
    );
  }, [products, quantities, shippingPrices, shippingInfo?.position]);
};

export default usePriceDetails;