import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        loading: false,
        categories : [],
        homeImages : [],
        websiteName : {}
    },
    reducers: {
       getWebsiteNameRequest(state, action){
        return {
            ...state,
            loading : true
        }
       },
       getWebsiteNameSuccess(state, action){
        return {
            ...state,
            loading : false,
            websiteName : action.payload.data
        }
       },
       getWebsiteNameFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
       },
       updateWebsiteNameRequest(state, action){
        return {
            ...state,
            loading : true
        }
       },
       updateWebsiteNameSuccess(state, action){
        return {
            ...state,
            loading : false,
            websiteName : action.payload.data,
            isUpdated : true
        }
       },
       updateWebsiteNameFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
       },
       getHomeCategoryRequest(state, action){
        return {
            ...state,
            loading : true
        }
       },
       getHomeCategorySuccess(state, action){
        return {
            ...state,
            loading : false,
            categories : action.payload.data
        }
       },
       getHomeCategoryFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
       },
       getHomeImagesRequest(state, action){
        return {
            ...state,
            loading : true
        }
       },
       getHomeImagesSuccess(state, action){
        return {
            ...state,
            loading : false,
            homeImages : action.payload.homeUI
        }
       },
       getHomeImagesFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
       },
       updateHomeImagesRequest(state, action){
        return {
            ...state,
            loading : true
        }
       },
       updateHomeImagesSuccess(state, action){
        return {
            ...state,
            loading : false,
            homeImages : action.payload.homeUI,
            message : action.payload.message
        }
       },
       updateHomeImagesFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
       },
       clearMessage(state, action){
        return {
            ...state,
            message : null,
            isUpdated : false,
            error : null
        }
       }
    }
});

const { actions, reducer } = homeSlice;
export const {
   getHomeCategoryRequest,
   getHomeCategorySuccess,
   getHomeCategoryFail,
   getHomeImagesRequest,
   getHomeImagesSuccess,
   getHomeImagesFail,
   updateHomeImagesRequest,
   updateHomeImagesSuccess,
   updateHomeImagesFail,
   getWebsiteNameRequest,
   getWebsiteNameSuccess,
   getWebsiteNameFail,
   updateWebsiteNameRequest,
   updateWebsiteNameSuccess,
   updateWebsiteNameFail,
   clearMessage
} = actions;
export default reducer;