import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState : {
        loading : false,
        wishList : []
    },
    reducers : {
      addWishListRequest(state, action){
        return{
            ...state,
            loading : true
        }
      },
      addWishListSuccess(state, action){
        return{
            ...state,
            loading : false,
            wishList : action.payload.data,
            isAddedToWishList : true
        }
      },
      addWishListFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
      },
      getWishListRequest(state, action){
        return{
            ...state,
            loading : true
        }
      },
      getWishListSuccess(state, action){
        return{
            ...state,
            loading : false,
            wishList : action.payload.data
        }
      },
      getWishListFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
      },
      removeWishListRequest(state, action){
        return{
            ...state,
            loading : true
        }
      },
      removeWishListSuccess(state, action){
        return{
            ...state,
            loading : false,
            wishList : action.payload.data,
            isRemovedToWishList : true
        }
      },
      removeWishListFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
      },
      clearWishList(state, action){
        return{
          ...state,
          isAddedToWishList : false,
          isRemovedToWishList : false,
        }
      },
      clearWishListError(state, action){
        return {
          ...state,
          error : null
        }
      }
    }
})


const { actions, reducer } = wishlistSlice
export const {
    addWishListRequest,
    addWishListSuccess,
    addWishListFail,
    getWishListRequest,
    getWishListSuccess,
    getWishListFail,
    removeWishListRequest,
    removeWishListSuccess,
    removeWishListFail,
    clearWishList,
    clearWishListError
} = actions
export default reducer