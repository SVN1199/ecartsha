import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        orders : [],
        myorders : [],
        singleOrder : {}
    },
    reducers: {
        createOrderRequest(state, action){
            return {
                ...state,
                loading : false
            }
        },        
        createOrderSuccess(state, action){
            return {
                ...state,
                loading : true,
                order : action.payload.order
            }
        },        
        createOrderFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },        
        getSingleOrderRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },        
        getSingleOrderSuccess(state, action){
            return {
                ...state,
                loading : false,
                order : action.payload.order
            }
        },        
        getSingleProductOrderRequest(state, action){
            return {
                ...state,
                loading : false
            }
        },        
        getSingleProductOrderSuccess(state, action){
            return {
                ...state,
                loading : true,
                singleOrder : action.payload.singleOrder
            }
        },        
        getSingleProductOrderFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },        
        getOrderRequest(state, action){
            return {
                ...state,
                loading : false
            }
        },        
        getOrderSuccess(state, action){
            return {
                ...state,
                loading : true,
                order : action.payload.orders
            }
        },        
        getOrderFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },       
        getMyOrderRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },        
        getMyOrderSuccess(state, action){
            return {
                ...state,
                loading : false,
                myorders : action.payload.userOrders
            }
        },        
        getMyOrderFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },         
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
    }
});

const { actions, reducer } = orderSlice;
export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    getSingleOrderRequest,
    getSingleOrderSuccess,
    getSingleOrderFail,
    getSingleProductOrderRequest,
    getSingleProductOrderSuccess,
    getSingleProductOrderFail,
    getOrderRequest,
    getOrderSuccess,
    getOrderFail,
    getMyOrderRequest,
    getMyOrderSuccess,
    getMyOrderFail,
    clearError
} = actions;
export default reducer;