import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import nightSlice from "./nightSlice";
import querySlice from "./querySlice";


export default configureStore({
    reducer:{
        dark:nightSlice,
        cart:cartSlice,
        query:querySlice
       
    }
})