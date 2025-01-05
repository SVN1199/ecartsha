import axios from "axios"
import { getHomeCategoryFail, getHomeCategoryRequest, getHomeCategorySuccess, getHomeImagesFail, getHomeImagesRequest, getHomeImagesSuccess, getWebsiteNameFail, getWebsiteNameRequest, getWebsiteNameSuccess, updateHomeImagesFail, updateHomeImagesRequest, updateHomeImagesSuccess, updateWebsiteNameFail, updateWebsiteNameRequest, updateWebsiteNameSuccess } from "../slices/homeSlice"

export const getHomeCategory = () => async(dispatch) => {
    try {
        dispatch(getHomeCategoryRequest())
        const { data } = await axios.get(`/api/v1/category/homecategory`)
        dispatch(getHomeCategorySuccess(data))
    } catch (error) {
        dispatch(getHomeCategoryFail(error.response.data.message))
    }
}

export const getHomeImages = () => async(dispatch) => {
    try {
        dispatch(getHomeImagesRequest())
        const { data } = await axios.get(`/api/v1/website/homeimages`)
        dispatch(getHomeImagesSuccess(data))
    } catch (error) {
        dispatch(getHomeImagesFail(error.response.data.message))
    }
}

export const updateHomeImages = (formData) => async(dispatch) => {
    try {
        dispatch(updateHomeImagesRequest())
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/website/homeimages`, formData, config)
        dispatch(updateHomeImagesSuccess(data))
    } catch (error) {
        dispatch(updateHomeImagesFail(error.response.data.message))
    }
}


export const getWebsiteName = () => async(dispatch) => {
    try {
        dispatch(getWebsiteNameRequest())
        const { data } = await axios.get(`/api/v1/website/websitename`)
        dispatch(getWebsiteNameSuccess(data))
    } catch (error) {
        dispatch(getWebsiteNameFail(error.response.data.message))
    }   
}


export const updateWebsiteName = (formData) => async(dispatch) => {
    try {
        dispatch(updateWebsiteNameRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const { data } = await axios.patch(`/api/v1/website/websitename`, formData, config)
        dispatch(updateWebsiteNameSuccess(data))
    } catch (error) {
        dispatch(updateWebsiteNameFail(error.response.data.message))
    }   
}