import {ToDoItem} from "../../models/ToDoItem";
import {Category} from "../../models/Category";
import {useAppDispatch} from "../../features/hooks";
import {completetodoitem, deletetodoitem} from "../../redux/todolistSlice";
import moment from "moment";

interface ToDoListItemProps {
    item: ToDoItem,
    category: Category
}

function ToDoListItem({item, category}: ToDoListItemProps) {
    const dispatch = useAppDispatch();

    function handleComplete() {
        dispatch(completetodoitem(item.id));
    }
    function handleDelete() {
        dispatch(deletetodoitem(item.id));
    }

    return (
        <div className="todoitem">
            <div>
                <h5
                    className={`mb-1 + ${item.is_completed? "text__completed" : ""}`}>
                    {category.name}: {item.name}
                </h5>
                {
                    item.deadline ?
                        <small>
                            {moment(Date.parse(item.deadline))
                                .format("DD.MM.YYYY HH:mm")}
                        </small> : ""
                }
            </div>
            <div className="btn_container">
                <button
                    className={`main_btn + ${item.is_completed? "btn__uncomplete" : "btn__complete"}`}
                    onClick={handleComplete}
                >
                    {item.is_completed? <i className="bi bi-x"></i> : <i className="bi bi-check-lg"></i>}
                </button>
                <button
                    className="main_btn btn__delete"
                    onClick={handleDelete}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default ToDoListItem;