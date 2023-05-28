export interface ToDoItem {
    id: number,
    category_id: number,
    name: string,
    deadline: string | null,
    is_completed: boolean
}