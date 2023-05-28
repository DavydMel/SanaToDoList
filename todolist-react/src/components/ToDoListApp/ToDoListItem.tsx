import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import {ToDoItem} from "../../models/ToDoItem";
import {Category} from "../../models/Category";
import {useAppDispatch} from "../../features/hooks";
import {completetodoitem, deletetodoitem} from "../../redux/todolistSlice";

interface ToDoListItemProps {
    item: ToDoItem,
    category: Category
}

function ToDoListItem({item, category}: ToDoListItemProps) {
    const dispatch = useAppDispatch();

    let bgColor: string = "info";
    if (item.is_completed) {
        bgColor = "success"
    }
    else if (!item.deadline) {
        bgColor = "";
    }
    else if (Date.parse(item.deadline) < Date.now()) {
        bgColor = "danger"
    }

    function handleComplete() {
        dispatch(completetodoitem(item.id));
    }
    function handleDelete() {
        dispatch(deletetodoitem(item.id));
    }

    return (
        <ListGroup.Item variant={bgColor}>
            <div className="d-flex flex-column">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.name}</h5>
                    {item.deadline? <small>{item.deadline}</small> : ""}
                </div>
                <p className="mb-1 align-self-start">Category: {category.name}</p>
                <div className="mt-3">
                    <Button
                        className="w-25 mx-2"
                        onClick={handleComplete}
                    >
                        {item.is_completed? "Don't complete" :"Complete"}
                    </Button>
                    <Button
                        className="w-25 mx-2"
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default ToDoListItem;