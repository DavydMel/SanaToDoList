import {ToDoItem} from "../models/ToDoItem";
import {ToDoItemForCreationInput} from "../models/view/ToDoItemForCreationInput";

export function SortToDoItems(toDoItems: ToDoItem[]): ToDoItem[] {
    function CompareToDoItems(a: ToDoItem, b: ToDoItem): number {
        if (a.is_completed) {
            return 1;
        }
        if (b.is_completed) {
            return -1;
        }

        if (!a.deadline) {
            return 1;
        }
        if (!b.deadline) {
            return -1;
        }

        return Date.parse(a.deadline) >= Date.parse(b.deadline) ? 1 : -1;
    }

    return toDoItems.sort(CompareToDoItems);
}

export function GetNewId(todoitems: ToDoItem[]): number {
    return Math.max(...todoitems.map(i => i.id)) + 1;
}

export function GenerateToDoItem(data: ToDoItemForCreationInput, id: number): ToDoItem {
    return {
        id: id,
        name: data.name,
        category_id: data.category_id,
        deadline: data.deadline,
        is_completed: false
    }
}