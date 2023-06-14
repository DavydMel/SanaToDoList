import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {ToDoItemForCreationInput} from "../models/view/ToDoItemForCreationInput";

export interface todolistState {
    data: ToDoItemsWithCategories,
    error: undefined | string
}
const initialState: todolistState = {
    data: {
        ToDoItems: [],
        Categories: [],
        Type: "db"
    },
    error: undefined
};

export const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        getToDoItemsSuccess: (state,
                      action: PayloadAction<ToDoItemsWithCategories>) => {
            state.data = {
                ...state.data,
                ToDoItems: action.payload.ToDoItems,
                Categories: action.payload.Categories
            }
            state.error = undefined;
        },
        getToDoItemsRejected: (state,
                               action: PayloadAction<string>) => {
            console.error(action.payload)
            state.error = action.payload;
        }
    }
});

export const {
    getToDoItemsSuccess,
    getToDoItemsRejected,
} = todolistSlice.actions;
export default todolistSlice.reducer;