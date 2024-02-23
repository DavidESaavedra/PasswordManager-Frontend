import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    counter: counterReducer,
  },
});
