import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Features/authSlice";

const store = configureStore({
    reducer: {
        authentication: authSlice
    }
})

export default store