import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterReducer";
import themeReducer from "./features/theme";
export const store=configureStore({
    reducer:{
        counter:counterReducer,
        theme:themeReducer
    }
})