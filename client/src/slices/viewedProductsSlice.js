import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name : 'products',
    initialState : {
        loading : false,
        viewedProducts : []
    },
    reducers : {
        getViewedProductsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getViewedProductsSuccess(state, action){
            return {
                loading : false,
                viewedProducts : action.payload.recentProducts,
            }
        },
        getViewedProductsFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const { actions, reducer } = productsSlice
export const {
    getViewedProductsRequest,
    getViewedProductsSuccess,
    getViewedProductsFail
} = actions
export default reducer