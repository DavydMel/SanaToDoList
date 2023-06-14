import {ToDoItem} from "../models/ToDoItem";
import {ToDoItemForCreationInput} from "../models/view/ToDoItemForCreationInput";
import {ajax} from "rxjs/internal/ajax/ajax";
import {Category} from "../models/Category";
import {map, Observable} from "rxjs";
import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";

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

interface GraphqlToDoItemsWithCategories {
    data: {
        categories: Category[],
        toDoItems: ToDoItem[]
    }
}
export function RequestToDoItem(): Observable<ToDoItemsWithCategories> {
    return ajax<GraphqlToDoItemsWithCategories>({
        url: "https://localhost:7116/graphql",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query GetToDoItemsWithCategories {
                  toDoItems {
                    id,
                    name,
                    category_id,
                    deadline,
                    is_completed
                  },
                  categories {
                    id,
                    name
                  }
                }
            `
        })
    }).pipe(
        map(res => {
            let toDoItemsWithCategories: ToDoItemsWithCategories = {
                ToDoItems: res.response.data.toDoItems,
                Categories: res.response.data.categories,
                Type: "db"
            }
            return toDoItemsWithCategories;
        })
    );
}

export function RequestAddToDoItem(toDoItem: ToDoItemForCreationInput): Observable<string> {
    return ajax<string>({
        url: "https://localhost:7116/graphql",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation AddToItem($toDoItem: ToDoItemInput!) {
                  createToDoItem(toDoItem: $toDoItem)
                }
            `,
            variables: {
                "toDoItem": {
                    "category_id": toDoItem.category_id,
                    "name": toDoItem.name,
                    "deadline": toDoItem.deadline === null ? toDoItem.deadline :
                        new Date(toDoItem.deadline).toISOString()
                }
            },
        })
    }).pipe(
        map(res => res.response)
    );
}

export function RequestCompleteToDoItem(id: number): Observable<string> {
    return ajax<string>({
        url: "https://localhost:7116/graphql",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation CompleteToDoItem($id: Int!) {
                  completeToDoItem(id: $id)
                }
            `,
            variables: {
                "id": Number(id)
            }
        })
    }).pipe(
        map(res => res.response)
    );
}

export function RequestDeleteToDoItem(id: number): Observable<string> {
    return ajax<string>({
        url: "https://localhost:7116/graphql",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation DeleteToDoItem($id: Int!) {
                  deleteToDoItem(id: $id)
                }
            `,
            variables: {
                "id": Number(id)
            }
        })
    }).pipe(
        map(res => res.response)
    );
}