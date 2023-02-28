import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import productReducer from "./slices/productSlice"
import categoryReducer from "./slices/categorySlice"
import filterReducer from "./slices/filterSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"

import { useDispatch } from "react-redux"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        filter: filterReducer,
        cart: cartReducer,
        order: orderReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();