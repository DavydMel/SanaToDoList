import ToDoList from "./ToDoList/ToDoList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/todolistSlice";

function ToDoListApp() {
    const data = useSelector((state: RootState) => state.data);
    const dispatch = useDispatch()

    return (
      <div>
          <ToDoList data={data} />
      </div>
    );
}

export default ToDoListApp;