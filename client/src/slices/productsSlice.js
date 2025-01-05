import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name : 'products',
    initialState : {
        loading : false,
        products : [],
    },
    reducers : {
        getProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductsSuccess(state, action){
            return {
                loading : false,
                products : action.payload.updatedProducts,
                totalPages : action.payload.totalPages,
            }
        },
        getProductsFail(state, action){
            return {
                loading : false,
                error : action.payload
            }
        },
        getFilterProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getFilterProductsSuccess(state, action){
            return {
                loading : false,
                products : action.payload.updatedProducts,
            }
        },
        getFilterProductsFail(state, action){
            return {
                loading : false,
                error : action.payload
            }
        },
        getSearchProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getSearchProductsSuccess(state, action){
            return {
                loading : false,
                products : action.payload.updatedProducts,
            }
        },
        getSearchProductsFail(state, action){
            return {
                loading : false,
                error : action.payload
            }
        },
        getCategoryProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getCategoryProductsSuccess(state, action){
            return {
                loading : false,
                products : action.payload.updatedProducts,
            }
        },
        getCategoryProductsFail(state, action){
            return {
                loading : false,
                error : action.payload
            }
        },
        getCartProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getCartProductsSuccess(state, action){
            return {
                loading : false,
                products : action.payload.items
            }
        },
        getCartProductsFail(state, action){
            return {
                loading : false,
                error : action.payload
            }
        },
        checkoutRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        checkoutSuccess(state, action){
            const data = sessionStorage.getItem('PlaceOrder') ? JSON.parse(sessionStorage.getItem('PlaceOrder')) : []
            return {
                ...state,
                loading : false,
                products : data.products,
                priceDetails : data.priceDetails
            }
        },
        getProductsNameRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductsNameSuccess(state, action){
            return {
                ...state,
                loading : false,
                productsName : action.payload.products
            }
        },
        getProductsNameFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getShippingPriceRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductsByCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductsByCategorySuccess(state, action){
            return {
                ...state,
                loading : false,
                products : action.payload.data,
                categoryName : action.payload.categoryName
            }
        },
        getProductsByCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearProductsError(state, action){
            return {
                ...state,
                loading : false,
                error : null
            }
        }
    }
})

const { actions, reducer } = productsSlice
export const {
    getProductsRequest,
    getProductsSuccess,
    getProductsFail,
    getFilterProductsRequest,
    getFilterProductsSuccess,
    getFilterProductsFail,
    getSearchProductsRequest,
    getSearchProductsSuccess,
    getSearchProductsFail,
    getCategoryProductsRequest,
    getCategoryProductsSuccess,
    getCategoryProductsFail,
    getCartProductsRequest,
    getCartProductsSuccess,
    getCartProductsFail,
    checkoutRequest,
    checkoutSuccess,
    getProductsNameRequest,
    getProductsNameSuccess,
    getProductsNameFail,
    getProductsByCategoryRequest,
    getProductsByCategorySuccess,
    getProductsByCategoryFail,
    clearProductsError
} = actions
export default reducer