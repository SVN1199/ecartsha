import axios from "axios"
import { deleteShippingPricesFail, deleteShippingPricesRequest, deleteShippingPricesSuccess, getShippingPricesFail, getShippingPricesRequest, getShippingPricesSuccess, shippingPricesFail, shippingPricesRequest, shippingPricesSuccess, updateShippingPricesFail, updateShippingPricesRequest, updateShippingPricesSuccess } from "../slices/ShippingPriceSlice"

export const createDistancePrice = (formData) => async(dispatch) => {
    try {
        dispatch(shippingPricesRequest())
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
        const { data } = await axios.put(`/api/v1/website/distanceprice`, formData, config)
        dispatch(shippingPricesSuccess(data))
    } catch (error) {
        dispatch(shippingPricesFail(error.response.data.message))
    }
}

export const updateDistancePrice = (formData, id) => async(dispatch) => {
    try {
        dispatch(updateShippingPricesRequest())
        const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
        const { data } = await axios.put(`/api/v1/website/updatedistanceprice?distancePriceId=${id}`, formData, config)
        dispatch(updateShippingPricesSuccess(data))
    } catch (error) {
        dispatch(updateShippingPricesFail(error.response.data.message))
    }
}

export const getDistancePrice = () => async(dispatch) => {
    try {
        dispatch(getShippingPricesRequest())
        const { data } = await axios.get(`/api/v1/website/distanceprice`)
        dispatch(getShippingPricesSuccess(data))
    } catch (error) {
        dispatch(getShippingPricesFail(error.response.data.message))
    }
}


export const deleteDistancePrice = (id) => async(dispatch) => {
    try {
        dispatch(deleteShippingPricesRequest())
        const { data } = await axios.delete(`/api/v1/website/distanceprice?distancePriceId=${id}`)
        dispatch(deleteShippingPricesSuccess(data))
    } catch (error) {
        dispatch(deleteShippingPricesFail(error.response.data.message))
    }
}

