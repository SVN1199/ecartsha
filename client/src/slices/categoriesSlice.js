import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name : 'categories',
    initialState : {
        loading : false,
        categories: [],
        productPrice : {}
    },
    reducers : {
        getCategoriesRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getCategoriesSuccess(state, action){
            return {
                loading : false,
                categories : action.payload.category,
                productPrice : action.payload.price
            }
        },
        getCategoriesFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        addMainCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        addMainCategorySuccess(state, action){
            return {
                loading : false,
                categories : action.payload.category,
            }
        },
        addMainCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        addSubCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        addSubCategorySuccess(state, action){
            return {
                loading : false,
                categories : action.payload.category,
            }
        },
        addSubCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        addChildCategoryRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        addChildCategorySuccess(state, action){
            return {
                loading : false,
                categories : action.payload.category,
            }
        },
        addChildCategoryFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getCategoriesForCreateProductRequest(state, action){
            return {
                ...state,
                loading : true
            }
        },
        getCategoriesForCreateProductSuccess(state, action){
            return {
                ...state,
                loading : false,
                categories : action.payload.categories
            }
        },
        getCategoriesForCreateProductFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
     
    }
})


const { actions, reducer } = categoriesSlice
export const {
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFail,
    addMainCategoryRequest,
    addMainCategorySuccess,
    addMainCategoryFail,
    addSubCategoryRequest,
    addSubCategorySuccess,
    addSubCategoryFail,
    addChildCategoryRequest,
    addChildCategorySuccess,
    addChildCategoryFail,
    getCategoriesForCreateProductRequest,
    getCategoriesForCreateProductSuccess,
    getCategoriesForCreateProductFail
} = actions
export default reducer