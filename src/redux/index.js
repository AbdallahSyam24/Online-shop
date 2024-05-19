import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./products/products.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        product: productReducer
    },
})

setupListeners(store.dispatch);