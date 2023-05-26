import {ToDoItemsWithCategories} from "../../../models/view/ToDoItemsWithCategories";
import ListGroup from "react-bootstrap/ListGroup";

type ToDoListProps = {
    data: ToDoItemsWithCategories
}

function ToDoList({data}: ToDoListProps) {
    return (
        <ListGroup as="ul">
            {
                data.ToDoItems.map((toDoItem) =>
                    <div>
                        {toDoItem.name}
                    </div>
                )
            }
        </ListGroup>
    );
}

export default ToDoList;