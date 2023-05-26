import {ToDoItem} from "../models/ToDoItem";
import {Category} from "../models/Category";
import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";

export function DefaultToDoItemsSeed(): ToDoItem[] {
    return [
        {
            id: 1,
            category_id: 1,
            name: "Study SQL2",
            deadline: new Date("04.04.2023 14:30:00"),
            is_completed: false
        },
        {
            id: 2,
            category_id: 2,
            name: "Visit parents2",
            deadline: new Date("13.04.2023 12:00:00"),
            is_completed: true
        },
        {
            id: 3,
            category_id: 3,
            name: "Buy a house2",
            deadline: null,
            is_completed: false
        },
    ];
}

export function DefaultCategoriesSeed(): Category[] {
    return [
        {
            id: 1,
            name: "First"
        },
        {
            id: 2,
            name: "Second"
        },
        {
            id: 3,
            name: "Third"
        },
    ];
}

export function DefaultDataSeed(): ToDoItemsWithCategories {
    return {
      ToDoItems: DefaultToDoItemsSeed(),
      Categories: DefaultCategoriesSeed(),
      Type: "db"
    };
}