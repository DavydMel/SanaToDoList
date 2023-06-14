import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {Epic, ofType} from "redux-observable";
import {catchError, delay, map, mergeMap, Observable, of} from "rxjs";
import {getToDoItemsSuccess, getToDoItemsRejected} from "./todolistSlice";
import {
    RequestAddToDoItem,
    RequestCompleteToDoItem,
    RequestDeleteToDoItem,
    RequestToDoItem
} from "../features/ToDoItemRepository";
import {ToDoItemForCreationInput} from "../models/view/ToDoItemForCreationInput";
import {PayloadAction} from "@reduxjs/toolkit";

export const getToDoItems = () => ({ type: "getToDoItems"});
export const getToDoItemsEpic: Epic = action$ => action$.pipe(
    ofType("getToDoItems"),
    //delay(3000),
    mergeMap(() => RequestToDoItem().pipe(
        map((res: ToDoItemsWithCategories) => getToDoItemsSuccess(res)),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);

export const addToDoItem = (toDoItem: ToDoItemForCreationInput) => (
    {type: "addToDoItem", payload: toDoItem});
export const addToDoItemEpic: Epic = (action$: Observable<PayloadAction<ToDoItemForCreationInput>>) => action$.pipe(
    ofType("addToDoItem"),
    map(action => action.payload),
    mergeMap((toDoItem) => RequestAddToDoItem(toDoItem).pipe(
        map(() => getToDoItems()),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);

export const completeToDoItem = (id: number) => ({type: "completeToDoItem", payload: id});
export const completeToDoItemEpic: Epic = (action$: Observable<PayloadAction<number>>) => action$.pipe(
    ofType("completeToDoItem"),
    map(action => action.payload),
    mergeMap((id) => RequestCompleteToDoItem(id).pipe(
        map(() => getToDoItems()),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);

export const deleteToDoItem = (id: number) => ({type: "deleteToDoItem", payload: id});
export const deleteToDoItemEpic: Epic = (action$: Observable<PayloadAction<number>>) => action$.pipe(
    ofType("deleteToDoItem"),
    map(action => action.payload),
    mergeMap((id) => RequestDeleteToDoItem(id).pipe(
        map(() => getToDoItems()),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);