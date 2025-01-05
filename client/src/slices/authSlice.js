import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        verifyEmailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        verifyEmailSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
                user: action.payload.tempUser
            }
        },
        verifyEmailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false,
            }
        },
        logOutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logOutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        changePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        changePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUpdated: true,
            }
        },
        changePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated : true
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateProfileRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        updateProfileSuccess(state, action){
            return{
                ...state,
                loading : false,
                user : action.payload.user,
                isUpdated : true,
            }
        },
        updateProfileFail(state, action){
            return{
                ...state,
                loading : false,
                isUpdated : false,
                error : action.payload
            }
        },
        clearProfileUpdate(state, action){
            return{
                ...state,
                isUpdated : false
            }
        },
        
    }
})

const { actions, reducer } = authSlice
export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    verifyEmailRequest,
    verifyEmailSuccess,
    verifyEmailFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logOutSuccess,
    logOutFail,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearProfileUpdate
} = actions
export default reducer