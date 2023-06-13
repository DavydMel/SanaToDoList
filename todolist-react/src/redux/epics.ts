import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {Epic, ofType} from "redux-observable";
import {catchError, delay, map, mergeMap, of} from "rxjs";
import {getToDoItemsSuccess, getToDoItemsRejected} from "./todolistSlice";
import {Category} from "../models/Category";
import {ToDoItem} from "../models/ToDoItem";
import {ajax} from "rxjs/internal/ajax/ajax";
import {AjaxError} from "rxjs/internal/ajax/errors";

export const getToDoItems = () => ({ type: "getToDoItems"});
interface GraphqlToDoItemsWithCategories {
    data: {
        categories: Category[],
        toDoItems: ToDoItem[]
    }
}
export const getToDoItemsEpic: Epic = action$ => action$.pipe(
    ofType("getToDoItems"),
    //delay(3000),
    mergeMap(action => ajax<GraphqlToDoItemsWithCategories>({
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
        }),
        map((res: ToDoItemsWithCategories) => getToDoItemsSuccess(res)),
        catchError((error: AjaxError) => of(getToDoItemsRejected(error.message)))
    ))
);