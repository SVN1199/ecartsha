import axios from "axios"
import { addChildCategoryFail, addChildCategoryRequest, addChildCategorySuccess, addMainCategoryFail, addMainCategoryRequest, addMainCategorySuccess, addSubCategoryFail, addSubCategoryRequest, addSubCategorySuccess, getCategoriesFail, getCategoriesForCreateProductFail, getCategoriesForCreateProductRequest, getCategoriesForCreateProductSuccess, getCategoriesRequest, getCategoriesSuccess } from "../slices/categoriesSlice"
import { deleteChildCategoryFail, deleteChildCategoryRequest, deleteChildCategorySuccess, deleteMainCategoryFail, deleteMainCategoryRequest, deleteMainCategorySuccess, deleteSubCategoryFail, deleteSubCategoryRequest, deleteSubCategorySuccess, UpdateChildCategoryFail, UpdateChildCategoryRequest, UpdateChildCategorySuccess, UpdateMainCategoryFail, UpdateMainCategoryRequest, UpdateMainCategorySuccess, UpdateSubCategoryFail, UpdateSubCategoryRequest, UpdateSubCategorySuccess } from "../slices/categorySlice"

let url = '/api/v1/category'

export const getCategories = () => async(dispatch) => {
    try {
        dispatch(getCategoriesRequest())
        const {data} = await axios.get(`${url}/getallcategory`)
        dispatch(getCategoriesSuccess(data))
    } catch (error) {
        dispatch(getCategoriesFail(error.response.data.message))
    }
}

export const addMainCategory = (formData) => async(dispatch) => {
    try {
        dispatch(addMainCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post(`${url}/createmaincategory`, formData, config)
        dispatch(addMainCategorySuccess(data))
    } catch (error) {
        dispatch(addMainCategoryFail(error.response.data.message))
    }
}

export const addSubCategory = (formData) => async(dispatch) => {
    try {
        dispatch(addSubCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post(`${url}/createsubcategory`, formData, config)
        dispatch(addSubCategorySuccess(data))
    } catch (error) {
        dispatch(addSubCategoryFail(error.response.data.message))
    }
}

export const addChildCategory = (formData) => async(dispatch) => {
    try {
        dispatch(addChildCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post(`${url}/createchildcategory`, formData, config)
        dispatch(addChildCategorySuccess(data))
    } catch (error) {
        dispatch(addChildCategoryFail(error.response.data.message))
    }
}


export const getCategoriesForCreateProduct = () => async(dispatch) => {
    try {
        dispatch(getCategoriesForCreateProductRequest())
        const {data} = await axios.get(`${url}/categoryforcreateproduct`)
        dispatch(getCategoriesForCreateProductSuccess(data))
    } catch (error) {
        dispatch(getCategoriesForCreateProductFail(error.response.data.message))
    }
}


export const updateCategory = (formData) => async(dispatch) => {
    try {
        dispatch(UpdateMainCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.patch(url, formData, config)
        console.log(data)
        dispatch(UpdateMainCategorySuccess(data))
    } catch (error) {
        dispatch(UpdateMainCategoryFail(error.response.data.message))
    }
}

export const updateSubCategory = (formData) => async(dispatch) => {
    try {
        dispatch(UpdateSubCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.patch(`${url}/subcategory`, formData, config)
        dispatch(UpdateSubCategorySuccess(data))
    } catch (error) {
        dispatch(UpdateSubCategoryFail(error.response.data.message))
    }
}

export const updateChildCategory = (formData) => async(dispatch) => {
    try {
        dispatch(UpdateChildCategoryRequest())
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.patch(`${url}/childcategory`, formData, config)
        dispatch(UpdateChildCategorySuccess(data))
    } catch (error) {
        dispatch(UpdateChildCategoryFail(error.response.data.message))
    }
}

export const deleteCategory = (id) => async(dispatch) => {
    try {
        dispatch(deleteMainCategoryRequest())
        const {data} = await axios.delete(url, id)
        dispatch(deleteMainCategorySuccess(data))
    } catch (error) {
        dispatch(deleteMainCategoryFail(error.response.data.message))
    }
}

export const deleteSubCategory = (id) => async(dispatch) => {
    try {
        dispatch(deleteSubCategoryRequest())
        const {data} = await axios.delete(`${url}/subcategory`, id)
        dispatch(deleteSubCategorySuccess(data))
    } catch (error) {
        dispatch(deleteSubCategoryFail(error.response.data.message))
    }
}

export const deleteChildCategory = (id) => async(dispatch) => {
    try {
        dispatch(deleteChildCategoryRequest())
        const {data} = await axios.delete(`${url}/childcategory`, id)
        dispatch(deleteChildCategorySuccess(data))
    } catch (error) {
        dispatch(deleteChildCategoryFail(error.response.data.message))
    }
}

