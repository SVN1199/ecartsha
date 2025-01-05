import { createSlice } from "@reduxjs/toolkit"

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        loading: true,
        feedbacks : [],
        isSubmitted : false
    },
    reducers: {
     postFeedBackRequest(state, action){
        return {
            ...state,
            loading : true
        }
     },
     postFeedBackSuccess(state, action){
        return {
            ...state,
            loading : false,
            feedbacks : action.payload.data,
            isSubmitted : true
        }
     },
     postFeedBackFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
     },
     getFeedBackRequest(state, action){
        return {
            ...state,
            loading : true
        }
     },
     getFeedBackSuccess(state, action){
        return {
            ...state,
            loading : false,
            feedbacks : action.payload.data
        }
     },
     getFeedBackFail(state, action){
        return {
            ...state,
            loading : false,
            error : action.payload
        }
     },
     clearMessages(state, action){
        return {
            ...state,
            isSubmitted : false,
            error : null
        }
     }
    }
})

const { actions, reducer } = feedbackSlice
export const {
    postFeedBackRequest,
    postFeedBackSuccess,
    postFeedBackFail,
    getFeedBackRequest,
    getFeedBackSuccess,
    getFeedBackFail,
    clearMessages
    } = actions
export default reducer