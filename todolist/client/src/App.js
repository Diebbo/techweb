import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        // Fetch todos when component mounts
        axios.get("/todos")
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    const addTodo = () => {
        if (!description) {
            alert("Description is required");
            return;
        }
        axios.post("/newtodo", { description, duedate: dueDate })
            .then(response => {
                setTodos([...todos, response.data]);
                setDescription("");
                setDueDate("");
            })
            .catch(error => {
                console.error("Error adding todo:", error);
            });
    };

    const markTodo = (id) => {
        axios.post(`/marktodo/${id}`)
            .then(response => {
                setTodos(todos.map(todo => 
                    todo.id === id ? { ...todo, done: !todo.done } : todo
                ));
            })
            .catch(error => {
                console.error("Error updating todo:", error);
            });
    };

    const deleteTodo = (id) => {
      axios.delete(`/todo/${id}`)
        .then(response => {
          setTodos(todos.filter(todo => todo.id !== id));
        }).catch(error => {
          console.error("Error deleting todo:", error);
        });
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Todo description"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.done ? "line-through" : "none" }}
                        >
                            {todo.description} - {todo.duedate}
                        </span>
                        <button onClick={() => markTodo(todo.id)}>
                            {todo.done ? "Undo" : "Done"}
                        </button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
