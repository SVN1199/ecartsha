import { createSlice } from "@reduxjs/toolkit"

const offersAdsSlice = createSlice({
    name: 'offersAds',
    initialState: {
        loading: true,
        offersAds : []
    },
    reducers: {
        getOffersAdsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getOffersAdsSuccess(state, action){
            return {
                ...state,
                loading : false,
                offersAds : action.payload.data
            }
        },
        getOffersAdsFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        createOffersAdsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        createOffersAdsSuccess(state, action){
            return {
                ...state,
                loading : false,
                offersAds : action.payload.data,
                isCreated : true
            }
        },
        createOffersAdsFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteOffersAdsRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteOffersAdsSuccess(state, action){
            return {
                ...state,
                loading : false,
                offersAds : action.payload.data,
                isDeleted : true
            }
        },
        deleteOffersAdsFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearNotify(state, action){
            return {
                ...state,
                isDeleted : false,
                error : null,
                isCreated : false
            }
        }
    }
})

const { actions, reducer } = offersAdsSlice
export const {
    getOffersAdsRequest,
    getOffersAdsSuccess,
    getOffersAdsFail,
    createOffersAdsRequest,
    createOffersAdsSuccess,
    createOffersAdsFail,
    deleteOffersAdsRequest,
    deleteOffersAdsSuccess,
    deleteOffersAdsFail,
    clearNotify
} = actions
export default reducer