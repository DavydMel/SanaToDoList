import {ToDoItemsWithCategories} from "../models/view/ToDoItemsWithCategories";
import {Epic, ofType} from "redux-observable";
import {catchError, delay, map, mergeMap, Observable, of, startWith} from "rxjs";
import {getToDoItemsSuccess, getToDoItemsRejected, getToDoItemsStart} from "./todolistSlice";
import {
    RequestAddToDoItem,
    RequestCompleteToDoItem,
    RequestDeleteToDoItem,
    RequestToDoItem
} from "../features/ToDoItemRepository";
import {ToDoItemForCreationInput} from "../models/view/ToDoItemForCreationInput";
import {PayloadAction} from "@reduxjs/toolkit";

export const getToDoItems = (storageType: string) =>
    ({ type: "getToDoItems", payload: storageType});
export const getToDoItemsEpic: Epic = (action$: Observable<PayloadAction<string>>) => action$.pipe(
    ofType("getToDoItems"),
    delay(2000),
    map(action => action.payload),
    mergeMap((storageType) => RequestToDoItem(storageType).pipe(
        map((res: ToDoItemsWithCategories) => getToDoItemsSuccess(res)),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    )),
    startWith(getToDoItemsStart())
);

export const addToDoItem = (toDoItem: ToDoItemForCreationInput, storageType: string) => (
    {type: "addToDoItem", payload: {data: toDoItem, storageType: storageType}});
interface AddToDoItemEpicPayload {
    data: ToDoItemForCreationInput,
    storageType: string
}
export const addToDoItemEpic: Epic = (action$: Observable<PayloadAction<AddToDoItemEpicPayload>>) => action$.pipe(
    ofType("addToDoItem"),
    map(action => action.payload),
    mergeMap((payload) => RequestAddToDoItem(payload.data, payload.storageType).pipe(
        map(() => getToDoItems(payload.storageType)),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);

export const completeToDoItem = (id: number, storageType: string) =>
    ({type: "completeToDoItem", payload: {id: id, storageType: storageType}});
interface CompleteAndDeleteToDoItemEpicPayload {
    id: number,
    storageType: string
}
export const completeToDoItemEpic: Epic = (action$: Observable<PayloadAction<CompleteAndDeleteToDoItemEpicPayload>>) =>
    action$.pipe(
    ofType("completeToDoItem"),
    map(action => action.payload),
    mergeMap((payload) => RequestCompleteToDoItem(payload.id, payload.storageType).pipe(
        map(() => getToDoItems(payload.storageType)),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);

export const deleteToDoItem = (id: number, storageType: string) =>
    ({type: "deleteToDoItem", payload: {id: id, storageType: storageType}});
export const deleteToDoItemEpic: Epic = (action$: Observable<PayloadAction<CompleteAndDeleteToDoItemEpicPayload>>) =>
    action$.pipe(
    ofType("deleteToDoItem"),
    map(action => action.payload),
    mergeMap((payload) => RequestDeleteToDoItem(payload.id, payload.storageType).pipe(
        map(() => getToDoItems(payload.storageType)),
        catchError((error) => of(getToDoItemsRejected(error.message)))
    ))
);