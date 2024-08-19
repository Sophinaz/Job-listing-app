import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobsApi } from "./getApi";
import loginSlice from "./loginSlice";

export const store = configureStore({
    reducer: {
        [jobsApi.reducerPath]: jobsApi.reducer, 
        authenticator: loginSlice, 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
})

setupListeners(store.dispatch)