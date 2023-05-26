export interface ToDoItem {
    id: number,
    category_id: number,
    name: string,
    deadline: Date | null,
    is_completed: boolean
}