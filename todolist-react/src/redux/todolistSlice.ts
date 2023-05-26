import { createSlice } from "@reduxjs/toolkit";
import { DefaultDataSeed } from "../features/DefaultDataSeed";

export const todolistSlice = createSlice({
    name: "todolist",
    initialState: {
       data: DefaultDataSeed()
    },
    reducers: {

    }
});

export type RootState = ReturnType<typeof todolistSlice.reducer>;
export default todolistSlice.reducer;