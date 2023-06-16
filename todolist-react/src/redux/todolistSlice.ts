import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";

export interface todolistState {
    data: ToDoItemsWithCategories,
    isLoading: boolean,
    error: undefined | string
}
const initialState: todolistState = {
    data: {
        ToDoItems: [],
        Categories: [],
        Type: "db"
    },
    isLoading: false,
    error: undefined
};

export const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        getToDoItemsStart: (state) => {
            state.isLoading = true;
        },
        getToDoItemsSuccess: (state,
                      action: PayloadAction<ToDoItemsWithCategories>) => {
            state.data = action.payload;
            state.error = undefined;
            state.isLoading = false;
        },
        getToDoItemsRejected: (state,
                               action: PayloadAction<string>) => {
            console.error(action.payload)
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    getToDoItemsStart,
    getToDoItemsSuccess,
    getToDoItemsRejected,
} = todolistSlice.actions;
export default todolistSlice.reducer;