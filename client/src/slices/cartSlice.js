import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: {
        addCartItemRequest(state) {
            state.loading = true;
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;

            const isItemExist = state.items.find(
                i => i===item
            );
        
            if (!isItemExist) {
                state.items.push(item);
            }
        
            state.loading = false;
        
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        getCartItemRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        getCartItemSuccess(state, action){
            return{
                ...state,
                loading : false,
                items : action.payload
            }
        },
        getCartItemFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        removeItemRequest(state) {
            state.loading = true;
        },
        removeItemSuccess(state, action) {
            state.loading = false;
            state.items = action.payload;
            state.isRemoved = true
        },
        saveShippingInfo(state, action){
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo:  action.payload,
                isUpdated : true
            }
        },
        clearItemsMessage(state, action){
            state.isRemoved = false
            state.isUpdated = false
        },
        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('PlaceOrder');
            return {
                items: [],
                loading: false,
                shippingInfo: {}
            }
        }
    }
});

const { actions, reducer } = cartSlice;
export const {
    addCartItemRequest,
    addCartItemSuccess,
    getCartItemRequest,
    getCartItemSuccess,
    getCartItemFail,
    removeItemRequest,
    removeItemSuccess,
    clearItemsMessage,
    checkoutRequest,
    checkoutSuccess,
    saveShippingInfo,
    orderCompleted
} = actions;
export default reducer;