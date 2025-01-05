import { createSlice } from "@reduxjs/toolkit"

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        loading: false,
        users : []
    },
    reducers: {
     getAllUsersRequest(state, action){
        return{
            ...state,
            loading : true,
        }
     },
     getAllUsersSuccess(state, action){
        return{
            ...state,
            loading : false,
            users : action.payload.data
        }
     },
     getAllUsersFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload
        }
     },
    }
})

const { actions, reducer } = adminUsersSlice

export const {
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFail
} = actions

export default reducer;