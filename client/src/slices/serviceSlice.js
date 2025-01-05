import { createSlice } from "@reduxjs/toolkit"

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        loading: true,
        services : {}
    },
    reducers: {
        updateServiceRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        updateServiceSuccess(state, action){
            return{
                ...state,
                loading : false,
                services : action.payload.data,
                isUpdated : true
            }
        },
        updateServiceFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getServiceRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        getServiceSuccess(state, action){
            return{
                ...state,
                loading : false,
                services : action.payload.data
            }
        },
        getServiceFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearService(state, action){
            return{
                ...state,
                isUpdated : false,
                error : false
            }
        },
    }
})

const { actions, reducer } = serviceSlice
export const {
    getServiceRequest,
    getServiceSuccess,
    getServiceFail,
    updateServiceRequest,
    updateServiceSuccess,
    updateServiceFail,
    clearService
} = actions
export default reducer