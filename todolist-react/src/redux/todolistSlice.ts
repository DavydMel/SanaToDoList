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
            state.error = action.payload;
        },
        addtodoitem: (state,
                      action: PayloadAction<ToDoItemForCreationInput>) => {
            //state.data.ToDoItems = [...state.data.ToDoItems, action.payload];
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
    getToDoItemsSuccess,
    getToDoItemsRejected,
    addtodoitem,
    completetodoitem,
    deletetodoitem
} = todolistSlice.actions;
export default todolistSlice.reducer;