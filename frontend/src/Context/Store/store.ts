import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './feature/cart.ts';

export const store = configureStore({
    reducer:{
        cartState:cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;