import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {ajax} from "rxjs/ajax";
import {Epic, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs";
import {gettodoitem} from "./todolistSlice";
import {Category} from "../models/Category";
import {ToDoItem} from "../models/ToDoItem";

export function GetToDoItemsWithCategories(): ToDoItemsWithCategories | null {
    const getToDoItemsWithCategories$ = ajax<ToDoItemsWithCategories>({
        method: "GET",
        url: "https://localhost:7116/graphql",
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
    })
    //     .pipe(map(result => {
    //     toDoItemsWithCategories = result.response
    // })
    //     );

    getToDoItemsWithCategories$.subscribe({
        next(value) {
            return value.response;
        },
        error(err) {
            console.error(err);
        }
    });
    return null;
}

export const getToDoItemsWithCategories = () => ({ type: "GET_TODOITEMS_WITH_CATEGORIES"});

interface GraphqlToDoItemsWithCategories {
    data: {
        categories: Category[],
        toDoItems: ToDoItem[]
    }
}
export const getToDoItemsWithCategoriesEpic: Epic = action$ => action$.pipe(
    ofType("GET_TODOITEMS_WITH_CATEGORIES"),
    mergeMap(action => fetch("https://localhost:7116/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
        })
        .then(res => res.json())
        .then((res: GraphqlToDoItemsWithCategories) => {
            let toDoItemsWithCategories: ToDoItemsWithCategories = {
                ToDoItems: res.data.toDoItems,
                Categories: res.data.categories,
                Type: "db"
            }
            return toDoItemsWithCategories;
        })
    ),
    map((res: ToDoItemsWithCategories) => gettodoitem(res))
);
// export const getToDoItemsWithCategoriesEpic: Epic = action$ => action$.pipe(
//     ofType("GET_TODOITEMS_WITH_CATEGORIES"),
//     mergeMap(action => ajax<ToDoItemsWithCategories>({
//             method: "GET",
//             url: "https://localhost:7116/graphql",
//             responseType: "json",
//             body: JSON.stringify({
//                 query: `
//                 query GetToDoItemsWithCategories {
//                   toDoItems {
//                     id,
//                     name,
//                     category_id,
//                     deadline,
//                     is_completed
//                   },
//                   categories {
//                     id,
//                     name
//                   }
//                 }
//             `
//             })
//         }).pipe(
//             map(response => gettodoitem(response.response))
//         )
//     )
// );