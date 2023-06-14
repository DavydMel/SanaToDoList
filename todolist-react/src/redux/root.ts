import {combineEpics, Epic} from "redux-observable";
import {addToDoItemEpic, completeToDoItemEpic, deleteToDoItemEpic, getToDoItemsEpic} from "./epics";
import {catchError} from "rxjs";

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        getToDoItemsEpic,
        addToDoItemEpic,
        completeToDoItemEpic,
        deleteToDoItemEpic
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );