import { createSlice } from "@reduxjs/toolkit"

const adminFeedBackSlice = createSlice({
    name: 'adminFeedback',
    initialState: {
        loading: false,
        feedbacks : []
    },
    reducers: {
     getAllFeedbacksRequest(state, action){
        return{
            ...state,
            loading : true,
        }
     },
     getAllFeedbacksSuccess(state, action){
        return{
            ...state,
            loading : false,
            feedbacks : action.payload.data,
            total: action.payload.total,
            currentPage: action.payload.currentPage,
            totalPages: action.payload.totalPages
        }
     },
     getAllFeedbacksFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
     },
    }
})

const { actions, reducer } = adminFeedBackSlice

export const {
    getAllFeedbacksRequest,
    getAllFeedbacksSuccess,
    getAllFeedbacksFail
} = actions

export default reducer;