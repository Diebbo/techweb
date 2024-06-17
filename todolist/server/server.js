import { readFile, writeFile } from "fs";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid"; // for generating unique IDs

class Todo {
    constructor(description, done, creationdate, duedate) {
        this.id = uuidv4();
        this.description = description;
        this.done = done;
        this.creationdate = creationdate;
        this.duedate = duedate;
    }
}

const app = express();
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
    // Get all todos -> from file todos.json
    readFile("todos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.send(data);
    });
});

app.post("/newtodo", (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is required");
    }
    if (!req.body.description) {
        return res.status(400).send("Description is required");
    }
    // Add a new todo -> to file todos.json
    readFile("todos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        let todos = [];
        if (data) {
            todos = JSON.parse(data);
        }

        const description = req.body.description;
        const duedate = req.body.duedate || "";
        const newTodo = new Todo(description, false, new Date(), duedate);
        todos.push(newTodo);

        writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send(newTodo);
        });
    });
});

app.post("/marktodo/:id", (req, res) => {
    // Update a todo -> to file todos.json
    readFile("todos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const todos = JSON.parse(data);
        let todoFound = false;
        todos.forEach((todo) => {
            if (todo.id === req.params.id) {
                todo.done = !todo.done;
                todoFound = true;
            }
        });

        if (!todoFound) {
            return res.status(404).send(`Todo with ID ${req.params.id} not found`);
        }

        writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send(`Todo ${req.params.id} updated successfully`);
        });
    });
});

app.delete("/todo/:id", (req, res) => {
    // Delete a todo -> from file todos.json
    readFile("todos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        let todos = JSON.parse(data);
        const newTodos = todos.filter((todo) => todo.id !== req.params.id);

        if (todos.length === newTodos.length) {
            return res.status(404).send(`Todo with ID ${req.params.id} not found`);
        }

        writeFile("todos.json", JSON.stringify(newTodos), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send(`Todo ${req.params.id} deleted successfully`);
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
