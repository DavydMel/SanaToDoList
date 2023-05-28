import ToDoList from "./ToDoList";
import {Container} from "react-bootstrap";
import {useAppSelector} from "../../features/hooks";
import ToDoListAddForm from "./ToDoListAddForm";
import {GetNewId, SortToDoItems} from "../../features/ToDoItemRepository";
import {ToDoItemsWithCategories} from "../../models/view/ToDoItemsWithCategories";

function ToDoListApp() {
    const data: ToDoItemsWithCategories = useAppSelector(
        (state) => {
            let todoitems = [...state.data.ToDoItems];
            return {
                ...state.data,
                ToDoItems: SortToDoItems(todoitems)
            };
        }
    );

    return (
      <Container>
          <div className="mt-3">
              <h1 className="mt-3">Add ToDoList Item</h1>
              <ToDoListAddForm
                  categories={data.Categories}
                  newId={GetNewId(data.ToDoItems)}
              />
          </div>
          <div className="mt-3">
              <h1 className="mt-3">ToDoList</h1>
              <ToDoList data={data} />
          </div>
      </Container>
    );
}

export default ToDoListApp;