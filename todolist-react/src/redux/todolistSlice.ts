import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultDataSeed } from "../features/DefaultDataSeed";
import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {ToDoItem} from "../models/ToDoItem";

interface todolistState {
    data: ToDoItemsWithCategories
}
const initialState: todolistState = {
    data: DefaultDataSeed()
};

export const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        addtodoitem: (state,
                      action: PayloadAction<ToDoItem>) => {
            state.data.ToDoItems = [...state.data.ToDoItems, action.payload];
        }
    }
});

export const { addtodoitem } = todolistSlice.actions;
export default todolistSlice.reducer;