import { createSlice } from "@reduxjs/toolkit"

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        loading: false,
        products: []
    },
    reducers: {
        addMultipleProductsRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        addMultipleProductsSuccess(state, action){
            return{
                ...state,
                loading : false,
                products : action.payload.products,
                isProductsAdded : true
            }
        },
        addMultipleProductsFail(state, action){
            return{
                ...state,
                loading : false,
                isProductsAdded : false,
                error: action.payload,
            }
        },
        getProductsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalProducts : action.payload.totalProducts,
                totalPages : action.payload.totalPages,
                currentPage : action.payload.currentPage
            }
        },
        getProductsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getProductsStocksRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductsStocksSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalProducts : action.payload.totalProducts
            }
        },
        getProductsStocksFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearProductsAdded(state, action){
            return {
                ...state,
                isProductsAdded : false
            }
        }
    }
})

const { actions, reducer } = adminProductsSlice

export const {
    addMultipleProductsRequest,
    addMultipleProductsSuccess,
    addMultipleProductsFail,
    getProductsRequest,
    getProductsSuccess,
    getProductsFail,
    getProductsStocksRequest,
    getProductsStocksSuccess,
    getProductsStocksFail,
    clearProductsAdded
} = actions

export default reducer