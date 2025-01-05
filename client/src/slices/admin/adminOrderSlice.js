import { createSlice } from "@reduxjs/toolkit"

const adminOrdersSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        loading: false,
        orders: {},
        returnOrder : {}
    },
    reducers: {
       getSingleOrderRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       getSingleOrderSuccess(state, action){
        return {
            ...state,
            loading: false,
            order: action.payload.order
        }
       },
       getSingleOrderFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
       getSingleReturnOrderRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       getSingleReturnOrderSuccess(state, action){
        return {
            ...state,
            loading: false,
            returnOrder : action.payload.data
        }
       },
       getSingleReturnOrderFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
       updateSingleReturnOrderStatusRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       updateSingleReturnOrderStatusSuccess(state, action){
        return {
            ...state,
            loading: false,
            returnOrder : action.payload.data,
            isUpdated : true
        }
       },
       updateSingleReturnOrderStatusFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
       OrderStatusModifyRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       OrderStatusModifySuccess(state, action){
        return {
            ...state,
            loading: false,
            order: action.payload.order
        }
       },
       OrderStatusModifyFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
       clearSingleReturnOrder(state, action){
        return{
            ...state,
            isUpdated : false
        }
       }
    }
})

const { actions, reducer } = adminOrdersSlice

export const {
   getSingleOrderRequest,
   getSingleOrderSuccess,
   getSingleOrderFail,
   OrderStatusModifyRequest,
   OrderStatusModifySuccess,
   OrderStatusModifyFail,
   getSingleReturnOrderRequest,
   getSingleReturnOrderSuccess,
   getSingleReturnOrderFail,
   updateSingleReturnOrderStatusRequest,
   updateSingleReturnOrderStatusSuccess,
   updateSingleReturnOrderStatusFail,
   clearSingleReturnOrder
} = actions

export default reducer;