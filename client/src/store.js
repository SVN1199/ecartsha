import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import categoriesReducer from './slices/categoriesSlice' 
import categoryReducer from './slices/categorySlice'
import viewedProductsReducer from './slices/viewedProductsSlice'
import cartReducer from './slices/cartSlice'
import reviewsReducer from './slices/reviewsSlice'
import adminProductsReducer from './slices/admin/adminProductsSlice'
import adminProductReducer from './slices/admin/adminProductSlice'
import adminOrdersReducer from './slices/admin/adminOrdersSlice'
import adminOrderReducer from './slices/admin/adminOrderSlice'
import orderReducer from './slices/orderSlice'
import shippingPricesReducer from './slices/ShippingPriceSlice'
import wishListReducer from './slices/wishListSlice'
import productsOffersReducer from './slices/productOffersSlice'
import feedbackReducer from './slices/feedbackSlice'
import homeReducer from './slices/homeSlice'
import adminUsersReducer from './slices/admin/adminUsersSlice'
import adminFeedBackReducer from './slices/admin/adminFeedbackSlice'
import adminDiscountReducer from './slices/admin/adminDiscountSlice'
import returnOrderReducer from './slices/returnOrderSlice'
import showcontentReducer from './slices/showContentSlice'
import serviceReducer from './slices/serviceSlice'
import offersAdsReducer from './slices/offersSlice'
import AdminDashboardReducer from './slices/admin/adminDashboardSlice'
import footerReducer from './slices/footerSlice'

const reducer = combineReducers({
    authState : authReducer,
    productsState : productsReducer,
    productState : productReducer,
    orderState : orderReducer,
    viewedProductsState : viewedProductsReducer,
    categoriesState : categoriesReducer,
    categoryState : categoryReducer,
    cartState : cartReducer,
    reviewsState : reviewsReducer,
    adminProductsState : adminProductsReducer,
    adminProductState : adminProductReducer,
    adminOrdersState : adminOrdersReducer,
    adminOrderState : adminOrderReducer,
    shippingPricesState : shippingPricesReducer,
    wishListState : wishListReducer,
    productsOffersState : productsOffersReducer,
    feedbackState : feedbackReducer,
    homeState : homeReducer,
    adminUsersState : adminUsersReducer,
    adminFeedBackState : adminFeedBackReducer,
    adminDiscountState : adminDiscountReducer,
    returnOrderState : returnOrderReducer,
    showcontentState : showcontentReducer,
    serviceState : serviceReducer,
    offersAdsState : offersAdsReducer,
    adminDashboardState : AdminDashboardReducer,
    footerState : footerReducer,
})

const store = configureStore({
    reducer
})

export default store;