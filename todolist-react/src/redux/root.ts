import {combineEpics, Epic} from "redux-observable";
import {getToDoItemsEpic} from "./epics";
import {catchError} from "rxjs";

export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(
        getToDoItemsEpic
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );