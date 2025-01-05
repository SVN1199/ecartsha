import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../actions/cartAction';

const useCart = () => {
  const dispatch = useDispatch();

  const { isRemoved } = useSelector((state) => state.cartState);
  const { products = [], loading } = useSelector((state) => state.productsState);

  const [quantities, setQuantities] = useState({});

  const handleAddQty = (itemId, maxQty) => {
    setQuantities((prev) => {
      const currentQty = prev[itemId] || 1;
      return {
        ...prev,
        [itemId]: currentQty < maxQty ? currentQty + 1 : currentQty,
      };
    });
  };

  const handleSubQty = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 1),
    }));
  };

  const handleRemoveItem = (productId, size) => {
    const item = `${productId}|${size}`;
    dispatch(removeCartItem(item));
  };

  return {
    isRemoved,
    products,
    quantities,
    handleAddQty,
    handleSubQty,
    handleRemoveItem,
    loading
  };
};

export default useCart;
