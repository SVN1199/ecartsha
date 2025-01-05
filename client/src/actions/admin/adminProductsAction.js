import axios from "axios"
import { addMultipleProductsFail, addMultipleProductsRequest, addMultipleProductsSuccess, getProductsFail, getProductsRequest, getProductsStocksFail, getProductsStocksRequest, getProductsStocksSuccess, getProductsSuccess } from "../../slices/admin/adminProductsSlice"
import { addProductDetailsFail, addProductDetailsRequest, addProductDetailsSuccess, addProductInventoryFail, addProductInventoryRequest, addProductInventorySuccess, deleteProductDetailsFail, deleteProductDetailsRequest, deleteProductDetailsSuccess, deleteProductFail, deleteProductInventoryFail, deleteProductInventoryRequest, deleteProductInventorySuccess, deleteProductRequest, deleteProductSuccess, editProductUpdateFail, editProductUpdateRequest, editProductUpdateSuccess, getProductDescriptionFail, getProductDescriptionRequest, getProductDescriptionSuccess, getProductDetailsFail, getProductDetailsRequest, getProductDetailsSuccess, getProductInventoryFail, getProductInventoryRequest, getProductInventorySuccess, getProductUpdateFail, getProductUpdateRequest, getProductUpdateSuccess, updateProductDescriptionFail, updateProductDescriptionRequest, updateProductDescriptionSuccess, updateProductInventoryFail, updateProductInventoryRequest, updateProductInventorySuccess } from "../../slices/admin/adminProductSlice"
import { getAllDiscountsFail, getAllDiscountsRequest, getAllDiscountsSuccess } from "../../slices/admin/adminDiscountSlice"


export const addMultipleProducts = (formData) => async (dispatch) => {
   try {
      dispatch(addMultipleProductsRequest())
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      };
      const { data } = await axios.post('/api/v1/products/addmultiproduct', formData, config)
      dispatch(addMultipleProductsSuccess(data))
   } catch (error) {
      dispatch(addMultipleProductsFail(error.response.data.message))
   }
}

export const getAllProducts = (page, rowsPerPage, search) => async (dispatch) => {
   try {
      dispatch(getProductsRequest())
      let url = `/api/v1/admin/products?page=${page}&rowsPerPage=${rowsPerPage}`
      if (search) {
         url += `&search=${search}`
      }
      const { data } = await axios.get(url)
      dispatch(getProductsSuccess(data))
   } catch (error) {
      dispatch(getProductsFail(error.response.data.message))
   }
}



export const getProductInventory = (productId) => async (dispatch) => {
   try {
      dispatch(getProductInventoryRequest())
      const { data } = await axios.get(`/api/v1/admin/productinventory/${productId}`)
      dispatch(getProductInventorySuccess(data))
   } catch (error) {
      dispatch(getProductInventoryFail(error.response.data.message))
   }
}


export const addProductInventory = (productId, formData) => async (dispatch) => {
   try {
      dispatch(addProductInventoryRequest())
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const { data } = await axios.post(`/api/v1/admin/productinventory/${productId}`, formData, config)
      dispatch(addProductInventorySuccess(data))
   } catch (error) {
      dispatch(addProductInventoryFail(error.response.data.message))
   }
}

export const updateProductInventory = (productId, inventoryId, formData) => async (dispatch) => {
   try {
      dispatch(updateProductInventoryRequest())
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const { data } = await axios.put(`/api/v1/admin/productinventory/${productId}?inventoryId=${inventoryId}`, formData, config)
      dispatch(updateProductInventorySuccess(data))
   } catch (error) {
      dispatch(updateProductInventoryFail(error.response.data.message))
   }
}

export const deleteProductInventory = (productId, inventoryId) => async (dispatch) => {
   try {
      dispatch(deleteProductInventoryRequest())
      const { data } = await axios.delete(`/api/v1/admin/productinventory/${productId}?inventoryId=${inventoryId}`)
      dispatch(deleteProductInventorySuccess(data))
   } catch (error) {
      dispatch(deleteProductInventoryFail(error.response.data.message))
   }
}



export const getProductDetails = (productId) => async (dispatch) => {
   try {
      dispatch(getProductDetailsRequest())
      const { data } = await axios.get(`/api/v1/admin/productdetail/${productId}`)
      dispatch(getProductDetailsSuccess(data))
   } catch (error) {
      dispatch(getProductDetailsFail(error.response.data.message))
   }
}


export const addProductDetails = (productId, formData) => async (dispatch) => {
   try {
      dispatch(addProductDetailsRequest())
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const { data } = await axios.put(`/api/v1/admin/productdetail/${productId}`, formData, config)
      dispatch(addProductDetailsSuccess(data))
   } catch (error) {
      dispatch(addProductDetailsFail(error.response.data.message))
   }
}


export const deleteProductDetail = (productId, detailId) => async (dispatch) => {
   try {
      dispatch(deleteProductDetailsRequest())
      const { data } = await axios.delete(`/api/v1/admin/productdetail/${productId}?detailId=${detailId}`)
      dispatch(deleteProductDetailsSuccess(data))
   } catch (error) {
      dispatch(deleteProductDetailsFail(error.response.data.message))
   }
}


export const getProductDescriptionAndHide = (productId) => async (dispatch) => {
   try {
      dispatch(getProductDescriptionRequest())
      const { data } = await axios.get(`/api/v1/admin/productdescriptionandhide/${productId}`)
      dispatch(getProductDescriptionSuccess(data))
   } catch (error) {
      dispatch(getProductDescriptionFail(error.response.data.message))
   }
}


export const getProductUpdate = (productId) => async (dispatch) => {
   try {
      dispatch(getProductUpdateRequest())
      const { data } = await axios.get(`/api/v1/admin/product/${productId}`)
      dispatch(getProductUpdateSuccess(data))
   } catch (error) {
      dispatch(getProductUpdateFail(error.response.data.message))
   }
}


export const updateProduct = (productId, formData) => async (dispatch) => {
   try {

      dispatch(editProductUpdateRequest())
      const config = {
           headers: { 'Content-Type': 'multipart/form-data' },
       };
       const { data } = await axios.put(`/api/v1/admin/product/${productId}`, formData, config);
       dispatch(editProductUpdateSuccess(data))
   } catch (error) {
       dispatch(editProductUpdateFail(error.response.data.message))
   }
};


export const updateProductDescriptionAndHide = (productId, formData) => async (dispatch) => {
   try {
      dispatch(updateProductDescriptionRequest())
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const { data } = await axios.put(`/api/v1/admin/productdescriptionandhide/${productId}`, formData, config)
      dispatch(updateProductDescriptionSuccess(data))
   } catch (error) {
      dispatch(updateProductDescriptionFail(error.response.data.message))
   }
}

export const getProductsStocks = (status, page = 1, limit = 10) => async (dispatch) => {
   try {
      dispatch(getProductsStocksRequest());
      const { data } = await axios.get(`/api/v1/admin/productstocks?status=${status}&page=${page}&limit=${limit}`);
      dispatch(getProductsStocksSuccess(data));
   } catch (error) {
      dispatch(getProductsStocksFail(error.response?.data?.message || error.message));
   }
};


export const deleteProduct = (productId) => async (dispatch) => {
   try {

      dispatch(deleteProductRequest())
       const { data } = await axios.delete(`/api/v1/admin/product?productId=${productId}`);
       dispatch(deleteProductSuccess(data))
   } catch (error) {
       dispatch(deleteProductFail(error.response.data.message))
   }
};


export const getDiscountProducts = (page = 1, limit = 5, minDiscount = 0, maxDiscount = 100 ) => async (dispatch) => {
   try {
      dispatch(getAllDiscountsRequest())
      const { data } = await axios.get(`/api/v1/admin/discounts?page=${page}&limit=${limit}&minDiscount=${minDiscount}&maxDiscount=${maxDiscount}`)
      dispatch(getAllDiscountsSuccess(data))
   } catch (error) {
      dispatch(getAllDiscountsFail(error.response.data.message))
   }
}
