import { createSlice } from "@reduxjs/toolkit"

const adminDashboardslice = createSlice({
    name: 'adminDashboard',
    initialState: {
        loading: false,
        dashboards : {}
    },
    reducers: {
     getDashboardsRequest(state, action){
        return{
            ...state,
            loading : true,
        }
     },
     getDashboardsSuccess(state, action){
        return{
            ...state,
            loading : false,
            dashboards : action.payload.data,
        }
     },
     getDashboardsFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
     },
    }
})

const { actions, reducer } = adminDashboardslice

export const {
    getDashboardsRequest,
    getDashboardsSuccess,
    getDashboardsFail
} = actions

export default reducer;