import {configureStore} from "@reduxjs/toolkit";
import todolistReducer from "./todolistSlice";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "./root";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
   reducer: todolistReducer,
   middleware: [epicMiddleware]
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;