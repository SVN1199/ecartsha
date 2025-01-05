import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : 'categories',
    initialState : {
        loading : false,
        category: {},
        isUpdated : false
    },
    reducers : {
        UpdateMainCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        UpdateMainCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isUpdated : true
            }
        },
        UpdateMainCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        UpdateSubCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        UpdateSubCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isUpdated : true
            }
        },
        UpdateSubCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        UpdateChildCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        UpdateChildCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isUpdated : true
            }
        },
        UpdateChildCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteMainCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteMainCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isDeleted : true
            }
        },
        deleteMainCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteSubCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteSubCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isDeleted : true
            }
        },
        deleteSubCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteChildCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        deleteChildCategorySuccess(state, action){
            return {
                loading : false,
                category : action.payload.category,
                isDeleted : true
            }
        },
        deleteChildCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearCategory(state, action){
            return{
                ...state,
                isUpdated : false,
                isDeleted : false
            }
        }
    }
})


const { actions, reducer } = categorySlice
export const {
    UpdateMainCategoryRequest,
    UpdateMainCategorySuccess,
    UpdateMainCategoryFail,
    UpdateSubCategoryRequest,
    UpdateSubCategorySuccess,
    UpdateSubCategoryFail,
    UpdateChildCategoryRequest,
    UpdateChildCategorySuccess,
    UpdateChildCategoryFail,
    deleteMainCategoryRequest,
    deleteMainCategorySuccess,
    deleteMainCategoryFail,
    deleteSubCategoryRequest,
    deleteSubCategorySuccess,
    deleteSubCategoryFail,
    deleteChildCategoryRequest,
    deleteChildCategorySuccess,
    deleteChildCategoryFail,
    clearCategory
} = actions
export default reducer