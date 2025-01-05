import axios from "axios"
import { checkoutRequest, checkoutSuccess, getCategoryProductsFail, getCategoryProductsRequest, getCategoryProductsSuccess, getFilterProductsFail, getFilterProductsRequest, getFilterProductsSuccess, getProductsByCategoryFail, getProductsByCategoryRequest, getProductsByCategorySuccess, getProductsFail, getProductsNameFail, getProductsNameRequest, getProductsNameSuccess, getProductsRequest, getProductsSuccess, getSearchProductsFail, getSearchProductsRequest, getSearchProductsSuccess} from "../slices/productsSlice"
import { getProductFail, getProductRequest, getProductSuccess, postProductFail, postProductRequest, postProductSuccess } from "../slices/productSlice"
import { getViewedProductsFail, getViewedProductsRequest, getViewedProductsSuccess } from "../slices/viewedProductsSlice"
import { addWishListFail, addWishListRequest, addWishListSuccess, getWishListFail, getWishListRequest, getWishListSuccess, removeWishListFail, removeWishListRequest, removeWishListSuccess } from "../slices/wishListSlice"
import { getProductsOffersFail, getProductsOffersRequest, getProductsOffersSuccess } from "../slices/productOffersSlice"

export const postProducts = (formData) => async (dispatch) => {
    try {
        dispatch(postProductRequest())
        const url = `/api/v1/products`;
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const { data } = await axios.post(url, formData, config );
        dispatch(postProductSuccess(data))
    } catch (error) {
        dispatch(postProductFail(error.response.data.message))
    }
}


export const getProducts = (page) => async (dispatch) => {
    try {
        dispatch(getProductsRequest());

        let url = `/api/v1/products?page=${page}`;
        const { data } = await axios.get(url);
        dispatch(getProductsSuccess(data));
    } catch (error) {
        dispatch(getProductsFail(error.response.data.message));
    }
};



export const getFilterProducts = (minPrice, maxPrice, category) => async (dispatch) => {
    try {
        dispatch(getFilterProductsRequest());

        let url = `/api/v1/products?`; // Start with query symbol

        if (minPrice !== null || maxPrice !== null) {
            if (minPrice !== null && maxPrice !== null) {
                url += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
            } else if (minPrice !== null) {
                url += `minPrice=${minPrice}`;
            } else if (maxPrice !== null) {
                url += `maxPrice=${maxPrice}`;
            }
        }

        if (category) {
            if (url.includes("=")) {
                url += `&category=${category}`;
            } else {
                url += `category=${category}`;
            }
        }

        const { data } = await axios.get(url);
        dispatch(getFilterProductsSuccess(data));
    } catch (error) {
        dispatch(getFilterProductsFail(error.response?.data?.message || error.message));
    }
};

export const getSearchProducts = (keyword) => async(dispatch) => {
    try {
        dispatch(getSearchProductsRequest())
        const { data } = await axios.get(`/api/v1/products/searchproducts?keyword=${keyword}`)
        dispatch(getSearchProductsSuccess(data))
    } catch (error) {
        dispatch(getSearchProductsFail(error.response.data.message))
    }
}

export const getCategoryProducts = (categoryId) => async(dispatch) => {
    try {
        dispatch(getCategoryProductsRequest())
        const { data } = await axios.get(`/api/v1/products/categoryproducts/${categoryId}`)
        dispatch(getCategoryProductsSuccess(data))
    } catch (error) {
        dispatch(getCategoryProductsFail(error.response.data.message))
    }
}


export const getSingleProducts = (productId, productCode, productName) => async (dispatch) => {
    try {
        dispatch(getProductRequest())
        const { data } = await axios.get(`/api/v1/products/${productName}/${productCode}/${productId}`)
        dispatch(getProductSuccess(data))
    } catch (error) {
        dispatch(getProductFail(error.response.data.message))
    }
}

export const recentViewedProducts = () => async (dispatch) => {
    try {
        dispatch(getViewedProductsRequest())
        const getItems = JSON.parse(localStorage.getItem('recent')) || []
        const recent = getItems.join(',')
        let url = `/api/v1/products/viewedproducts?recent=${recent}`
        const { data } = await axios.get(url)
        dispatch(getViewedProductsSuccess(data))
    } catch (error) {
        dispatch(getViewedProductsFail(error.response.data.message))
    }
}


export const getCheckOutProducts = () => async(dispatch) => {
    try {
        dispatch(checkoutRequest())
        const data = JSON.parse(sessionStorage.getItem('PlaceOrder'))
        dispatch(checkoutSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

export const getProductsName = (productName) => async(dispatch) => {
    try {
        dispatch(getProductsNameRequest())
        const { data } = await axios.get(`/api/v1/products/searchname?productName=${productName}`)
        dispatch(getProductsNameSuccess(data))
    } catch (error) {
        dispatch(getProductsNameFail(error.response.data.message))
    }
}

export const addWishList = (productId) => async(dispatch) => {
    try {
        dispatch(addWishListRequest())
        const { data } = await axios.put(`/api/v1/products/userfeatures/addtowishlist?productId=${productId}`)
        dispatch(addWishListSuccess(data))
    } catch (error) {
        dispatch(addWishListFail(error.response.data.message))
    }
}

export const removeWishList = (productId) => async(dispatch) => {
    try {
        dispatch(removeWishListRequest())
        const { data } = await axios.put(`/api/v1/products/userfeatures/removefromwishlist?productId=${productId}`)
        dispatch(removeWishListSuccess(data))
    } catch (error) {
        dispatch(removeWishListFail(error.response.data.message))
    }
}


export const getWishList = () => async(dispatch) => {
    try {
        dispatch(getWishListRequest())
        const { data } = await axios.get(`/api/v1/products/userfeatures/addtowishlist`)
        dispatch(getWishListSuccess(data))
    } catch (error) {
        dispatch(getWishListFail(error.response.data.message))
    }
}


export const getOffersProduct = () => async(dispatch) => {
    try {
        dispatch(getProductsOffersRequest())
        const { data } = await axios.get(`/api/v1/products/offers`)
        dispatch(getProductsOffersSuccess(data))
    } catch (error) {
        dispatch(getProductsOffersFail(error.response.data.message))
    }
}

export const getProductsByMainCategory = (categoryId) => async(dispatch) => {
    try {
        dispatch(getProductsByCategoryRequest())
        const { data } = await axios.get(`/api/v1/products/productsbycategory/${categoryId}`)
        console.log(data)
        dispatch(getProductsByCategorySuccess(data))
    } catch (error) {
        dispatch(getProductsByCategoryFail(error.response.data.message))
    }
}

