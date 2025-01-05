import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        user : {}
    },
    reducers: {
        userProfileRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        userProfileSuccess(state, action){
            return{
                ...state,
                loading : false,
                user : action.payload.user
            }
        },
        userProfileFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const { actions, reducer } = authSlice
export const {
} = actions
export default reducer