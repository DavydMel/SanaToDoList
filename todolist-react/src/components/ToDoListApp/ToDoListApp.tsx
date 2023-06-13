import ToDoList from "./ToDoList";
import {Container} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import ToDoListAddForm from "./ToDoListAddForm";
import {getToDoItems} from "../../redux/epics";
import {useEffect} from "react";
import {todolistState} from "../../redux/todolistSlice";

function ToDoListApp() {
    const {data, error}: todolistState = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getToDoItems());
    }, []);

    return (
      <Container>
          {
              error === undefined ?
                  (
                      <div>
                          <div className="mt-3">
                              <h1 className="mt-3">Add ToDoList Item</h1>
                              <ToDoListAddForm categories={data.Categories} />
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