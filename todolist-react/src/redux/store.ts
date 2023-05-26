import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";

export default configureStore({
   reducer: todolistReducer,
});