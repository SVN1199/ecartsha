import axios from "axios"
import { getShowContentFail, getShowContentRequest, getShowContentSuccess, updateShowContentFail, updateShowContentRequest, updateShowContentSuccess } from "../slices/showContentSlice"
import { getServiceFail, getServiceRequest, getServiceSuccess, updateServiceFail, updateServiceRequest, updateServiceSuccess } from "../slices/serviceSlice"
import { createOffersAdsFail, createOffersAdsRequest, createOffersAdsSuccess, deleteOffersAdsFail, deleteOffersAdsRequest, deleteOffersAdsSuccess, getOffersAdsFail, getOffersAdsRequest, getOffersAdsSuccess } from "../slices/offersSlice"
import { getFooterContentFail, getFooterContentRequest, getFooterContentSuccess, updateFooterContentFail, updateFooterContentRequest, updateFooterContentSuccess, updateFooterMediaFail, updateFooterMediaRequest, updateFooterMediaSuccess } from "../slices/footerSlice"

export const getContentOptions = () => async (dispatch) => {
    try {
        dispatch(getShowContentRequest())
        const { data } = await axios.get(`/api/v1/website/contentOptions`)
        dispatch(getShowContentSuccess(data))
    } catch (error) {
        dispatch(getShowContentFail(error.response.data.message))
    }
}

export const updateContentOptions = (codOptionEnable, categoryEnable, offersAdEnable, offersEnable) => async (dispatch) => {
    try {
        dispatch(updateShowContentRequest())
        const { data } = await axios.put(`/api/v1/website/contentOptions?codOptionEnable=${codOptionEnable}&categoryEnable=${categoryEnable}&offersAdEnable=${offersAdEnable}&offersEnable=${offersEnable}`)
        dispatch(updateShowContentSuccess(data))
    } catch (error) {
        dispatch(updateShowContentFail(error.response.data.message))
    }
}



export const updateServicesAndAbout = (formData) => async (dispatch) => {
    try {
        dispatch(updateServiceRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/website/servicesandabout`, formData, config)
        dispatch(updateServiceSuccess(data))
    } catch (error) {
        dispatch(updateServiceFail(error.response.data.message))
    }
}


export const getServicesAndAbout = () => async (dispatch) => {
    try {
        dispatch(getServiceRequest())
        const { data } = await axios.get(`/api/v1/website/servicesandabout`)
        dispatch(getServiceSuccess(data))
    } catch (error) {
        dispatch(getServiceFail(error.response.data.message))
    }
}

export const createOffersAds = (formData) => async (dispatch) => {
    try {
        dispatch(createOffersAdsRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/website/offers`, formData, config)
        dispatch(createOffersAdsSuccess(data))
    } catch (error) {
        dispatch(createOffersAdsFail(error.response.data.message))
    }
}




export const getOffersAdvertisement = () => async (dispatch) => {
    try {
        dispatch(getOffersAdsRequest())
        const { data } = await axios.get(`/api/v1/website/offers`)
        dispatch(getOffersAdsSuccess(data))
    } catch (error) {
        dispatch(getOffersAdsFail(error.response.data.message))
    }
}


export const deleteOffersAdvertisement = (id) => async (dispatch) => {
    try {
        dispatch(deleteOffersAdsRequest())
        const { data } = await axios.delete(`/api/v1/website/offers?id=${id}`)
        dispatch(deleteOffersAdsSuccess(data))
    } catch (error) {
        dispatch(deleteOffersAdsFail(error.response.data.message))
    }
}

export const getFooterContent = () => async (dispatch) => {
    try {
        dispatch(getFooterContentRequest())
        const { data } = await axios.get(`/api/v1/website/footercontent`)
        dispatch(getFooterContentSuccess(data))
    } catch (error) {
        dispatch(getFooterContentFail(error.response.data.message))
    }
}


export const updateFooterContent = (formData) => async (dispatch) => {
    try {
        dispatch(updateFooterContentRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/website/footercontent`, formData, config)
        dispatch(updateFooterContentSuccess(data))
    } catch (error) {
        dispatch(updateFooterContentFail(error.response.data.message))
    }
}


export const updateFooterMedia = (mediaId, formData) => async (dispatch) => {
    try {
        dispatch(updateFooterMediaRequest());

        const url = mediaId 
            ? `/api/v1/website/footermedia?id=${mediaId}` 
            : `/api/v1/website/footermedia`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(url, formData, config);
        dispatch(updateFooterMediaSuccess(data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong.';
        dispatch(updateFooterMediaFail(errorMessage));
    }
};
