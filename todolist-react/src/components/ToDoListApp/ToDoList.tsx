import {ToDoItemsWithCategories} from "../../models/view/ToDoItemsWithCategories";
import ToDoListItem from "./ToDoListItem";

type ToDoListProps = {
    data: ToDoItemsWithCategories
}

function ToDoList({data}: ToDoListProps) {
    return (
        <div className="vertival-list">
            {
                data.ToDoItems.map((toDoItem) => {
                    let category = data.Categories.find(
                        c => Number(c.id) === toDoItem.category_id
                    );

                    if (category) {
                        return (
                            <ToDoListItem
                                key={toDoItem.id}
                                item={toDoItem}
                                category={category}
                                storageType={data.Type}
                            />
                        );
                    }
                })
            }
        </div>
    );
}

export default ToDoList;