import { createSlice } from "@reduxjs/toolkit";

const initialState={
    queryItems:"",
   
}

const querySlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItems:(state,action)=>{
            state.queryItems=action.payload
        },
      
    }
})

export default querySlice.reducer
export const {addItems}=querySlice.actions