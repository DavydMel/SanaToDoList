import {ToDoItemsWithCategories} from "../../models/view/ToDoItemsWithCategories";
import ListGroup from "react-bootstrap/ListGroup";
import ToDoListItem from "./ToDoListItem";

type ToDoListProps = {
    data: ToDoItemsWithCategories
}

function ToDoList({data}: ToDoListProps) {
    return (
        <ListGroup>
            {
                data.ToDoItems.map((toDoItem) => {
                    let category = data.Categories.find(
                        c => c.id === toDoItem.category_id
                    );

                    if (category) {
                        return (
                            <ToDoListItem
                                key={toDoItem.id}
                                item={toDoItem}
                                category={category}
                            />
                        );
                    }
                })
            }
        </ListGroup>
    );
}

export default ToDoList;