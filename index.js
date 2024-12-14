// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(morgan('dev')); // Logs requests to the console
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded request bodies

// Sample data (in-memory database)
let todos = [
    { id: 1, task: 'Learn Express', completed: false },
    { id: 2, task: 'Build an API', completed: false }
];

// Routes

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Sample App!');
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { task, completed } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    const newTodo = {
        id: todos.length + 1,
        task,
        completed: completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const { task, completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        if (task) todo.task = task;
        if (typeof completed === 'boolean') todo.completed = completed;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
