import ToDoList from "./ToDoList";
import {Container} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import ToDoListAddForm from "./ToDoListAddForm";
import {ToDoItemsWithCategories} from "../../models/view/ToDoItemsWithCategories";
import {getToDoItemsWithCategories} from "../../redux/epics";
import {useEffect} from "react";

function ToDoListApp() {
    const data: ToDoItemsWithCategories = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getToDoItemsWithCategories());
    }, []);

    console.log(data)
    return (
      <Container>
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
      </Container>
    );
}

export default ToDoListApp;