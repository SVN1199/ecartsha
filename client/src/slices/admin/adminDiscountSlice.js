import { createSlice } from "@reduxjs/toolkit"

const adminDiscountslice = createSlice({
    name: 'adminDiscounts',
    initialState: {
        loading: false,
        discounts : []
    },
    reducers: {
     getAllDiscountsRequest(state, action){
        return{
            ...state,
            loading : true,
        }
     },
     getAllDiscountsSuccess(state, action){
        return{
            ...state,
            loading : false,
            discounts : action.payload.data,
            totalOffers : action.payload.totalOffers,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage
        }
     },
     getAllDiscountsFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
     },
    }
})

const { actions, reducer } = adminDiscountslice

export const {
    getAllDiscountsRequest,
    getAllDiscountsSuccess,
    getAllDiscountsFail
} = actions

export default reducer;