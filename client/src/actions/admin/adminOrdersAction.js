import axios from "axios"
import { getAllOrdersFail, getAllOrdersRequest, getAllOrdersSuccess, getReturnOrdersFail, getReturnOrdersRequest, getReturnOrdersSuccess } from "../../slices/admin/adminOrdersSlice"
import { getSingleOrderFail, getSingleOrderRequest, getSingleOrderSuccess, getSingleReturnOrderFail, getSingleReturnOrderRequest, getSingleReturnOrderSuccess, OrderStatusModifyFail, OrderStatusModifyRequest, OrderStatusModifySuccess, updateSingleReturnOrderStatusFail, updateSingleReturnOrderStatusRequest, updateSingleReturnOrderStatusSuccess } from "../../slices/admin/adminOrderSlice"


export const getAllOrders = (orderStatus, page, rowsPerPage) => async (dispatch) => {
    try {
        dispatch(getAllOrdersRequest());
        const { data } = await axios.get(
            `/api/v1/admin/allorders?orderStatus=${orderStatus}&page=${page + 1}&limit=${rowsPerPage}`
        );
        dispatch(getAllOrdersSuccess(data));
    } catch (error) {
        dispatch(getAllOrdersFail(error.response.data.message));
    }
};


export const getSingleOrder = (orderId) => async(dispatch) => {
    try {
        dispatch(getSingleOrderRequest())
        const {data} = await axios.get(`/api/v1/admin/order/${orderId}`)
        dispatch(getSingleOrderSuccess(data))
    } catch (error) {
        dispatch(getSingleOrderFail(error.response.data.message))
    }
}

export const OrderStatusModify = (orderId, status) => async(dispatch) => {
    try {
        dispatch(OrderStatusModifyRequest())
        const {data} = await axios.patch(`/api/v1/admin/orderstatus/${orderId}?orderStatus=${status}`)
        dispatch(OrderStatusModifySuccess(data))
    } catch (error) {
        dispatch(OrderStatusModifyFail(error.response.data.message))
    }
}




export const getAllReturnOrders = (statusFilter, page=1, limit=10) => async(dispatch) => {
    try {
        dispatch(getReturnOrdersRequest())
        const {data} = await axios.get(`/api/v1/admin/managereturn?status=${statusFilter}&page=${page}&limit=${limit}`)
        dispatch(getReturnOrdersSuccess(data))
    } catch (error) {
        dispatch(getReturnOrdersFail(error.response.data.message))
    }
}


export const getSingleReturnOrder = (orderId, orderItemId) => async(dispatch) => {
    try {
        dispatch(getSingleReturnOrderRequest())
        const {data} = await axios.get(`/api/v1/admin/returnorder/${orderId}/${orderItemId}`)
        dispatch(getSingleReturnOrderSuccess(data))
    } catch (error) {
        dispatch(getSingleReturnOrderFail(error.response.data.message))
    }
}

export const updateSingleReturnOrderStatus = (orderId, orderItemId, status) => async(dispatch) => {
    try {
        dispatch(updateSingleReturnOrderStatusRequest())
        const {data} = await axios.put(`/api/v1/admin/returnorder/${orderId}/${orderItemId}?status=${status}`)
        dispatch(updateSingleReturnOrderStatusSuccess(data))
    } catch (error) {
        dispatch(updateSingleReturnOrderStatusFail(error.response.data.message))
    }
}
