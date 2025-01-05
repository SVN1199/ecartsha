import { createSlice } from "@reduxjs/toolkit"

const showcontentSlice = createSlice({
    name: 'showcontent',
    initialState: {
        loading: true,
        showcontent : {}
    },
    reducers: {
        getShowContentRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        getShowContentSuccess(state, action){
            return{
                ...state,
                loading : false,
                showcontent : action.payload.data
            }
        },
        getShowContentFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        updateShowContentRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        updateShowContentSuccess(state, action){
            return{
                ...state,
                loading : false,
                showcontent : action.payload.data,
                isUpdated : true
            }
        },
        updateShowContentFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const { actions, reducer } = showcontentSlice
export const {  
    getShowContentRequest,
    getShowContentSuccess,
    getShowContentFail,
    updateShowContentRequest,
    updateShowContentSuccess,
    updateShowContentFail
} = actions
export default reducer