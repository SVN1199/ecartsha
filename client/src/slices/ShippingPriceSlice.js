import { createSlice } from "@reduxjs/toolkit"

const shippingPriceSlice = createSlice({
    name: 'shippingPrice',
    initialState: {
        loading: true,
        shippingPrices : []
    },
    reducers: {
        shippingPricesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        shippingPricesSuccess(state, action) {
            return {
                loading: false,
                shippingPrices : action.payload.data,
                isShippingPrice : true
            }
        },
        shippingPricesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getShippingPricesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getShippingPricesSuccess(state, action) {
            return {
                loading: false,
                shippingPrices : action.payload.data,
            }
        },
        getShippingPricesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateShippingPricesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateShippingPricesSuccess(state, action) {
            return {
                loading: false,
                shippingPrices : action.payload.data,
            }
        },
        updateShippingPricesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteShippingPricesRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteShippingPricesSuccess(state, action) {
            return {
                loading: false,
                shippingPrices : action.payload.data,
            }
        },
        deleteShippingPricesFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null,
            }
        },
       
    }
})

const { actions, reducer } = shippingPriceSlice
export const {
    shippingPricesRequest,
    shippingPricesSuccess,
    shippingPricesFail,
    updateShippingPricesRequest,
    updateShippingPricesSuccess,
    updateShippingPricesFail,
    getShippingPricesRequest,
    getShippingPricesSuccess,
    getShippingPricesFail,
    deleteShippingPricesRequest,
    deleteShippingPricesSuccess,
    deleteShippingPricesFail
} = actions
export default reducer