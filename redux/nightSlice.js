import { createSlice } from "@reduxjs/toolkit";

export const nightSlice=createSlice({
    name:"night",
    initialState:{
        dark:true
    },
    reducers:{
        update:(state,action)=>{
            state.dark=action.payload.dark
        }
    }
})


export const {update}=nightSlice.actions
export default nightSlice.reducer