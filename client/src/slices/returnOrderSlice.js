import { createSlice } from "@reduxjs/toolkit";

const returnOrderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        returnOrders : []
    },
    reducers: {
        returnOrderPostRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        returnOrderPostSuccess(state, action){
            return{
                ...state,
                loading : false,
                returnOrder : action.payload.data,
                isReturnOrderPost : true
            }
        },
        returnOrderPostFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getReturnOrderRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        getReturnOrderSuccess(state, action){
            return{
                ...state,
                loading : false,
                returnOrders : action.payload.data
            }
        },
        getReturnOrderFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        cancelReturnOrderRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        cancelReturnOrderSuccess(state, action){
            return{
                ...state,
                loading : false,
                returnOrder : action.payload.data,
                isReturnOrderCancel : true
            }
        },
        cancelReturnOrderFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearReturnOrder(state, action){
            return{
                ...state,
                isReturnOrderPost : false,
                isReturnOrderCancel : false
            }
        }
    }
});

const { actions, reducer } = returnOrderSlice;
export const {
    returnOrderPostRequest,
    returnOrderPostSuccess,
    returnOrderPostFail,
    getReturnOrderRequest,
    getReturnOrderSuccess,
    getReturnOrderFail,
    cancelReturnOrderRequest,
    cancelReturnOrderSuccess,
    cancelReturnOrderFail,
    clearReturnOrder
} = actions;
export default reducer;