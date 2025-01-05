import axios from 'axios';
import { addCartItemRequest, addCartItemSuccess, removeItemRequest, removeItemSuccess } from '../slices/cartSlice';
import { checkoutRequest, checkoutSuccess, getCartProductsFail, getCartProductsRequest, getCartProductsSuccess } from '../slices/productsSlice';

export const addCartItem = (carts) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());
        dispatch(addCartItemSuccess(carts))
    } catch (error) {
        console.log(error);
    }
};

export const removeCartItem = (productItem) => async (dispatch) => {
    try {
        dispatch(removeItemRequest());
        let carts = JSON.parse(localStorage.getItem('cartItems')) || [];
        carts = carts.filter(item => item !== productItem);
        dispatch(removeItemSuccess(carts));
        localStorage.setItem('cartItems', JSON.stringify(carts));
    } catch (error) {
        console.log(error);
    }
};



export const getCartItems = () => async (dispatch) => {
    try {
        dispatch(getCartProductsRequest());
        const carts = JSON.parse(localStorage.getItem('cartItems')) || [];
        const queryString = carts.map(cart => `carts=${encodeURIComponent(cart)}`).join('&');
        const { data } = await axios.get(`/api/v1/products/getcartproducts?${queryString}`);
        dispatch(getCartProductsSuccess(data));
    } catch (error) {
        dispatch(getCartProductsFail(error.response.data.message));
    }
};


export const checkOutItems = () => async (dispatch) => {
    try {
        dispatch(checkoutRequest())
        dispatch(checkoutSuccess())
    } catch (error) {
        console.log(error)
    }
}