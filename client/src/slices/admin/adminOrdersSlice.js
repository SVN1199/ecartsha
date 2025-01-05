import { createSlice } from "@reduxjs/toolkit"

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        loading: false,
        orders: [],
        returnOrders  : []
    },
    reducers: {
       getAllOrdersRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       getAllOrdersSuccess(state, action){
        return {
            ...state,
            loading: false,
            orders: action.payload.orders,
            orderCount: action.payload.orderCount
        }
       },
       getAllOrdersFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
       getReturnOrdersRequest(state, action){
        return {
            ...state,
            loading: true,
        }
       },
       getReturnOrdersSuccess(state, action){
        return {
            ...state,
            loading: false,
            returnOrders : action.payload.data,
            returnOrderCount : action.payload.returnOrderCount
        }
       },
       getReturnOrdersFail(state, action){
        return {
            ...state,
            loading: false,
            error : action.payload
        }
       },
    }
})

const { actions, reducer } = adminOrdersSlice

export const {
   getAllOrdersRequest,
   getAllOrdersSuccess,
   getAllOrdersFail,
   getReturnOrdersRequest,
   getReturnOrdersSuccess,
   getReturnOrdersFail
} = actions

export default reducer;