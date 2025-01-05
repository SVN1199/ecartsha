import { createSlice } from "@reduxjs/toolkit";

const productsOffersSlice = createSlice({
    name : 'productsOffers',
    initialState : {
        loading : false,
        products : [],
    },
    reducers : {
        getProductsOffersRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getProductsOffersSuccess(state, action){
            return {
                ...state,
                loading : false,
                products : action.payload.data
            }
        },
        getProductsOffersFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const { actions, reducer } = productsOffersSlice
export const {
    getProductsOffersRequest,
    getProductsOffersSuccess,
    getProductsOffersFail
} = actions
export default reducer