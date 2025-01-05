import axios from "axios";
import { createOrderFail, createOrderRequest, createOrderSuccess, getOrderFail, getOrderRequest, getOrderSuccess, getSingleOrderFail, getSingleOrderRequest, getSingleOrderSuccess, getSingleProductOrderFail, getSingleProductOrderRequest, getSingleProductOrderSuccess } from "../slices/orderSlice";
import { cancelReturnOrderFail, cancelReturnOrderRequest, cancelReturnOrderSuccess, getReturnOrderFail, getReturnOrderRequest, getReturnOrderSuccess, returnOrderPostFail, returnOrderPostRequest, returnOrderPostSuccess } from "../slices/returnOrderSlice";

export const newOrder = (orderData) => async(dispatch) => {
    try {
        dispatch(createOrderRequest())
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
        const { data } = await axios.post(`/api/v1/orders/neworder`, orderData, config);
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}

export const getSingleOrder = (id) => async(dispatch) => {
    try {
        dispatch(getSingleOrderRequest())
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
        const { data } = await axios.get(`/api/v1/orders/getorder/${id}`);
        dispatch(getSingleOrderSuccess(data))
    } catch (error) {
        dispatch(getSingleOrderFail(error.response.data.message));
    }
}

export const getSingleProductOrder = ( orderId, singleOrderId ) => async(dispatch) => {
    try {
        dispatch(getSingleProductOrderRequest())
        const { data } = await axios.get(`/api/v1/order/singleorder/${orderId}/${singleOrderId}`);
        dispatch(getSingleProductOrderSuccess(data))
    } catch (error) {
        dispatch(getSingleProductOrderFail(error.response.data.message));
    }
}




export const getOrders = () => async(dispatch) => {
    try {
        dispatch(getOrderRequest())
        const { data } = await axios.get(`/api/v1/orders/myorder`);
        dispatch(getOrderSuccess(data))
    } catch (error) {
        dispatch(getOrderFail(error.response.data.message));
    }
}


export const returnOrderPost = (formData, orderId, orderItemId) => async(dispatch) => {
    try {
        dispatch(returnOrderPostRequest())
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
        const { data } = await axios.post(`/api/v1/order/returnorder?orderId=${orderId}&orderItemId=${orderItemId}`, formData, config);
        dispatch(returnOrderPostSuccess(data))
    } catch (error) {
        dispatch(returnOrderPostFail(error.response.data.message));
    }
}


export const getReturnOrder = (orderId, orderItemId) => async(dispatch) => {
    try {
        dispatch(getReturnOrderRequest())
        const { data } = await axios.get(`/api/v1/order/returnorder?orderId=${orderId}&orderItemId=${orderItemId}`);
        dispatch(getReturnOrderSuccess(data))
    } catch (error) {
        dispatch(getReturnOrderFail(error.response.data.message));
    }
}

export const cancelReturnOrder = (orderId, orderItemId) => async(dispatch) => {
    try {
        dispatch(cancelReturnOrderRequest())
        const { data } = await axios.delete(`/api/v1/order/returnorder?orderId=${orderId}&orderItemId=${orderItemId}`);
        dispatch(cancelReturnOrderSuccess(data))
    } catch (error) {
        dispatch(cancelReturnOrderFail(error.response.data.message));
    }
}