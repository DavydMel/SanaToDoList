import { configureStore } from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";

const store = configureStore({
   reducer: todolistReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;