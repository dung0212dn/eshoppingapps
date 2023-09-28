import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "../Reducer/CartReducer";

const store = configureStore({
      reducer: cartReducer,
      devTools: process.env.NODE_ENV !== 'production',
})

export default store;