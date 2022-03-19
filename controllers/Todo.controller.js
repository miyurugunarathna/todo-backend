import Todo from "../models/Todo.model.js";

// Create a new todo
export const addTodo = (req, res) => {
    const { content, status } = req.body;
    const newTodo = new Todo({ content, status });
    newTodo.save((err, todo) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(todo);
        }
    });
}

// Get all todos
export const getTodos = (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(todos);
        }
    });
}

// Update a todo
export const updateTodo = (req, res) => {
    const id = req.params.id;
    const { content, status } = req.body;
    Todo.findByIdAndUpdate(id, { content, status }, (err, todo) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(todo);
        }
    });
}

// Delete a todo
export const deleteTodo = (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id, (err, todo) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(todo);
        }
    });
}