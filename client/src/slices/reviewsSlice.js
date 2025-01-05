import { createSlice } from "@reduxjs/toolkit"

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        loading: true,
        reviews : {}
    },
    reducers: {
        postReviewsRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        postReviewsSuccess(state, action){
            return{
                ...state,
                loading : false,
                reviews : action.payload.reviews,
                isCommented : true
            }
        },
        postReviewsFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearReviews(state, action){
            return{
                ...state,
                loading : false,
                isCommented : false,
                error : null
            }
        },
        getReviewsRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        getReviewsSuccess(state, action){
            return{
                ...state,
                loading : false,
                reviews : action.payload.reviews
            }
        },
        getReviewsFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getAllReviewsRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        getAllReviewsSuccess(state, action){
            return{
                ...state,
                loading : false,
                reviews : action.payload.reviews
            }
        },
        getAllReviewsFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const { actions, reducer } = reviewsSlice
export const {
    postReviewsRequest,
    postReviewsSuccess,
    postReviewsFail,
    getReviewsRequest,
    getReviewsSuccess,
    getReviewsFail,
    getAllReviewsRequest,
    getAllReviewsSuccess,
    getAllReviewsFail,
    clearReviews
} = actions
export default reducer