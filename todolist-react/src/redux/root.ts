import {combineEpics, Epic} from "redux-observable";
import {getToDoItemsWithCategoriesEpic} from "./epics";
import {catchError} from "rxjs";

// export const rootEpic = combineEpics(
//   getToDoItemsWithCategoriesEpic,
// );
export const rootEpic: Epic = (action$, store$, dependencies) =>
    combineEpics(getToDoItemsWithCategoriesEpic)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );