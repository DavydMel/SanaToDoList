import ToDoList from "./ToDoList";
import {Container} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import ToDoListAddForm from "./ToDoListAddForm";
import {getToDoItems} from "../../redux/epics";
import React, {useEffect} from "react";
import {todolistState} from "../../redux/todolistSlice";
import {startWith} from "rxjs";

function ToDoListApp() {
    const {data, isLoading, error}: todolistState = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getToDoItems(data.Type));
    }, []);

    function handleXmlStorageSwitcher() {
        let newStorageType = data.Type === "db" ? "xml" : "db";
        dispatch(getToDoItems(newStorageType));
    }

    console.log(isLoading)
    return (
      <Container>
          {
              isLoading ? (
                  <div className="loader-container">
                      <div className="loader"></div>
                  </div>
              ) : error === undefined ?
                  (
                      <div>
                          <div className="my-3 d-flex flex-column">
                              <span>Use xml storage:</span>
                              <label className="switch">
                                  <input type="checkbox" /*checked={data.Type === "xml"}*/
                                         onChange={handleXmlStorageSwitcher}
                                  />
                                  <span className="slider round"></span>
                              </label>
                          </div>
                          <div className="mt-3">
                              <h1 className="mt-3">Add ToDoList Item</h1>
                              <ToDoListAddForm
                                  categories={data.Categories}
                                  storageType={data.Type}
                              />
                          </div>
                          <div className="mt-3">
                              <h1 className="mt-3">ToDoList</h1>
                              <ToDoList data={data} />
                          </div>
                      </div>
                  ) :
                  (
                      <div className="error-message">
                          <strong>Помилка:</strong>
                          <p>Щось пішло не так...</p>
                          <p>Ймовірно зв'язок з сервером був перерваний</p>
                          <p>Будь ласка, спробуйте пізніше</p>
                      </div>
                  )
          }
      </Container>
    );
}

export default ToDoListApp;