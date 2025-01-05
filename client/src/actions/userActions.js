import axios from "axios"
import { 
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    changePasswordFail, changePasswordRequest, changePasswordSuccess, clearError, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logOutFail, logOutSuccess, registerFail, registerRequest, registerSuccess, verifyEmailFail, verifyEmailRequest, verifyEmailSuccess, 
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    updateProfileRequest,
    updateProfileFail,
    updateProfileSuccess} from "../slices/authSlice"
import { getMyOrderFail, getMyOrderRequest, getMyOrderSuccess } from "../slices/orderSlice"
import { postFeedBackFail, postFeedBackRequest, postFeedBackSuccess } from "../slices/feedbackSlice"

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(loginRequest())
        const {data} =  await axios.post('/api/v1/auth/login', {email, password})
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const clearAuthError = (dispatch) => {
    dispatch(clearError())
}

export const register = (userData) => async(dispatch) => {
    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const {data} =  await axios.post('/api/v1/auth/register', userData, config)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

export const verifyEmail = (formData) => async(dispatch) => {
    try {
        dispatch(verifyEmailRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} =  await axios.post('/api/v1/auth/sendotpviaemail', formData, config)
        dispatch(verifyEmailSuccess(data))
    } catch (error) {
        dispatch(verifyEmailFail(error.response.data.message))
    }
}


export const updatePassword = (password, newPassword) => async(dispatch) => {
    try {
        dispatch(changePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} =  await axios.put('/api/v1/auth/updatepassword', {password, newPassword}, config)
        dispatch(changePasswordSuccess(data))
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message))
    }
} 

export const forgotPassword = (formData) => async(dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/auth/forgotpassword', formData, config)
        dispatch(forgotPasswordSuccess(data))
        
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}


export const resetPassword = (password, confirmPassword, token) => async(dispatch) => {
    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/auth/resetpassword/${token}`, {password, confirmPassword}, config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get(`/api/v1/auth/getuser`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}
 
export const logOut = async(dispatch) => {
    try {
        await axios.get('/api/v1/auth/logout')
        dispatch(logOutSuccess())
    } catch (error) {
        dispatch(logOutFail(error.response.data.message))
    }
}


export const updateUserProfile = (formData, id) => async(dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put(`/api/v1/auth/updateprofile/${id}`, formData, config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}


export const getMyOrders = () => async(dispatch) => {
    try {
        dispatch(getMyOrderRequest())
        const {data} = await axios.get('/api/v1/order/myorder')
        dispatch(getMyOrderSuccess(data))
    } catch (error) {
        dispatch(getMyOrderFail(error.response.data.message))
    }   
}

export const postFeedback = (formData) => async(dispatch) => {
    try {
        dispatch(postFeedBackRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/user/feedback', formData, config)
        dispatch(postFeedBackSuccess(data))
    } catch (error) {
        dispatch(postFeedBackFail(error.response.data.message))
    }   
}

export const getFeedback = () => async(dispatch) => {
    try {
        dispatch(postFeedBackRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.get('/api/v1/user/feedback')
        dispatch(postFeedBackSuccess(data))
    } catch (error) {
        dispatch(postFeedBackFail(error.response.data.message))
    }   
}