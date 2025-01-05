import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : 'product',
    initialState : {
        loading : false,
        product : {},
    },
    reducers : {
        getProductRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductSuccess(state, action){
            return {
                loading : false,
                product : action.payload.product
            }
        },
        getProductFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        postProductRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        postProductSuccess(state, action){
            return {
                loading : false,
                product : action.payload.product,
                productCreated : true
            }
        },
        postProductFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearProduct(state, action){
            return {
                ...state,
                productCreated : false,
                error : false
            }
        }
    }
})

const { actions, reducer } = productSlice
export const {
    getProductRequest,
    getProductSuccess,
    getProductFail,
    postProductRequest,
    postProductSuccess,
    postProductFail,
    clearProduct
} = actions
export default reducer