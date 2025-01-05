import { createSlice } from "@reduxjs/toolkit"

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: {
        loading: false,
        product: []
    },
    reducers: {
        getProductInventoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductInventorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        getProductInventoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        addProductInventoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        addProductInventorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        addProductInventoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateProductInventoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateProductInventorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        updateProductInventoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteProductInventoryRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteProductInventorySuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        deleteProductInventoryFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearProductError(state, action){
            return {
                ...state,
                error: null
            }
        },
        getProductDetailsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        getProductDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getProductUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductUpdateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        getProductUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        editProductUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        editProductUpdateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated : true
            }
        },
        editProductUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProduct(state, action){
            return{
                ...state,
                isProductUpdated : false
            }
        },
        addProductDetailsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        addProductDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        addProductDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteProductDetailsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteProductDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        deleteProductDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getProductDescriptionRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getProductDescriptionSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        getProductDescriptionFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateProductDescriptionRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateProductDescriptionSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        updateProductDescriptionFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteProductRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        deleteProductSuccess(state, action){
            return{
                ...state,
                loading : false,
                isProductDeleted : true,
                message : action.payload.message
            }
        },
        deleteProductFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearDeleteError(state, action){
            return{
                ...state,
                isProductDeleted : false
            }
        }
    }
})

const { actions, reducer } = adminProductSlice

export const {
    getProductInventoryRequest,
    getProductInventorySuccess,
    getProductInventoryFail,
    addProductInventoryRequest,
    addProductInventorySuccess,
    addProductInventoryFail,
    updateProductInventoryRequest,
    updateProductInventorySuccess,
    updateProductInventoryFail,
    deleteProductInventoryRequest,
    deleteProductInventorySuccess,
    deleteProductInventoryFail,
    clearProductError,
    addProductDetailsRequest,
    addProductDetailsSuccess,
    addProductDetailsFail,
    getProductDetailsRequest,
    getProductDetailsSuccess,
    getProductDetailsFail,
    deleteProductDetailsRequest,
    deleteProductDetailsSuccess,
    deleteProductDetailsFail,
    getProductDescriptionRequest,
    getProductDescriptionSuccess,
    getProductDescriptionFail,
    updateProductDescriptionRequest,
    updateProductDescriptionSuccess,
    updateProductDescriptionFail,
    getProductUpdateRequest,
    getProductUpdateSuccess,
    getProductUpdateFail,
    editProductUpdateRequest,
    editProductUpdateSuccess,
    editProductUpdateFail,
    clearUpdateProduct,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearDeleteError
} = actions

export default reducer;