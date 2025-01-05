import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        loading: false,
        footer : {}
    },
    reducers: {
     getFooterContentRequest(state, action){
        return {
            ...state,
            loading : true,
        }
     },
     getFooterContentSuccess(state, action){
        return {
            ...state,
            loading : false,
            footer : action.payload.data
        }
     },
     getFooterContentFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
     },
     updateFooterContentRequest(state, action){
        return {
            ...state,
            loading : true,
        }
     },
     updateFooterContentSuccess(state, action){
        return {
            ...state,
            loading : false,
            footer : action.payload.data,
            isUpdated : true
        }
     },
     updateFooterContentFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
     },
     updateFooterMediaRequest(state, action){
        return {
            ...state,
            loading : true,
        }
     },
     updateFooterMediaSuccess(state, action){
        return {
            ...state,
            loading : false,
            footer : action.payload.data,
            isUpdated : true
        }
     },
     updateFooterMediaFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
     },
     clearMessages(state, action){
        return{
            ...state,
            isUpdated : false,
            error : null
        }
     }
    }
});

const { actions, reducer } = homeSlice;
export const {
    getFooterContentRequest,
    getFooterContentSuccess,
    getFooterContentFail,
    updateFooterContentRequest,
    updateFooterContentSuccess,
    updateFooterContentFail,
    updateFooterMediaRequest,
    updateFooterMediaSuccess,
    updateFooterMediaFail,
    clearMessages
} = actions;
export default reducer;