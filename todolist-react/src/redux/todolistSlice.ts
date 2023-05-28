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
        },
        completetodoitem: (state,
                           action: PayloadAction<number>) => {
            let todoitem =
                state.data.ToDoItems.find(i => i.id === action.payload);
            if (todoitem) {
                todoitem.is_completed = !todoitem.is_completed;
            }
        },
        deletetodoitem: (state,
            action: PayloadAction<number>) => {
            let index = state.data.ToDoItems
                .findIndex(i => i.id === action.payload);
            if (index > -1) {
                state.data.ToDoItems.splice(index, 1);
            }
        }
    }
});

export const {
    addtodoitem,
    completetodoitem,
    deletetodoitem
} = todolistSlice.actions;
export default todolistSlice.reducer;