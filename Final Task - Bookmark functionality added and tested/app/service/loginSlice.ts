import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'authenticate',
    initialState:  { value: false },
    reducers: {
        authorize(state) {
            state.value = true
        }, 
        unauthorize(state){
            state.value = false
        }
    }
})

export const  { authorize, unauthorize } = authSlice.actions;
export default authSlice.reducer