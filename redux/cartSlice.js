import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  total: 0,
  itemAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const checkProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (checkProduct) {
        toast.error("Ürün sepetinizde zaten var");
      } else {
        state.cartItems.push(action.payload);
        toast.success("Ürün Sepete Eklendi!");
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.success("Sepet Temizlendi!");
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.success(`- ${action.payload.name} - adlı ürün başarıyla silindi!`);
    },

    increase: (state, action) => {
      const checkProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      checkProduct.amount += 1;
    },
    decrease: (state, action) => {
      const checkProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      checkProduct.amount <= 1
        ? checkProduct.amount == 1
        : (checkProduct.amount -= 1);
    },
    CalculateAll: (state, action) => {
      let total = 0;
      state.cartItems.map((item) => (total += item.amount * item.price));
      state.total = total;
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  clearCart,
  removeItem,
  increase,
  decrease,
  CalculateAll,
} = cartSlice.actions;
