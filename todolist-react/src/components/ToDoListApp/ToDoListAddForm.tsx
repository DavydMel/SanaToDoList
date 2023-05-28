import {Category} from "../../models/Category";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {ToDoItemForCreationInput} from "../../models/view/ToDoItemForCreationInput";
import {useAppDispatch} from "../../features/hooks";
import {GenerateToDoItem} from "../../features/ToDoItemRepository";
import {addtodoitem} from "../../redux/todolistSlice";

interface ToDoListAddFormProps {
    categories: Category[],
    newId: number
}
const initialRawToDoItem: ToDoItemForCreationInput = {
    name: "",
    category_id: 1,
    deadline: null
};

function ToDoListAddForm({categories, newId}: ToDoListAddFormProps) {
    const dispatch = useAppDispatch();

    const [RawTodoitem, setRawTodoitem] =
        useState<ToDoItemForCreationInput>(initialRawToDoItem);

    function handleCategoryIdChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRawTodoitem({
            ...RawTodoitem,
            category_id: Number(e.target.value)
        });
    }
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRawTodoitem({
           ...RawTodoitem,
           name: e.target.value
        });
    }
    function handleDeadlineChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRawTodoitem({
            ...RawTodoitem,
            deadline: e.target.value
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let todoitem = GenerateToDoItem(RawTodoitem, newId);
        dispatch(addtodoitem(todoitem));
        setRawTodoitem(initialRawToDoItem);
    }

    return (
        <Form className="mb-3"
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <Form.Group className="mb-3">
               <Form.Label>Category</Form.Label>
                <Form.Select name="category_id"
                             value={RawTodoitem.category_id}
                             onChange={(e) => {
                                 handleCategoryIdChange(e);
                             }}
                >
                    {categories.map(category => {
                        return (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        );
                    })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Text"
                    value={RawTodoitem.name}
                    onChange={(e) => {
                        handleNameChange(e);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="deadline"
                    onChange={e => {
                        handleDeadlineChange(e);
                    }}
                />
            </Form.Group>

            <Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ToDoListAddForm;