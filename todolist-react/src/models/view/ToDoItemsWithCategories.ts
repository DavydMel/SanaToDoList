import { ToDoItem } from "../ToDoItem";
import {Category} from "../Category";

export interface ToDoItemsWithCategories {
    ToDoItems: ToDoItem[],
    Categories: Category[],
    Type: "db" | "xml"
}