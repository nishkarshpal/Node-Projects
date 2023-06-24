const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory data store
let tasks = [];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description || completed === undefined) {
    res.status(400).json({ error: 'Invalid request' });
  } else {
    const newTask = { id: generateId(), title, description, completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else if (!title || !description || completed === undefined) {
    res.status(400).json({ error: 'Invalid request' });
  } else {
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
    res.json(tasks[taskIndex]);
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    tasks.splice(taskIndex, 1);
    res.sendStatus(204);
  }
});

// Helper function to generate a unique ID
function generateId() {
  return Date.now().toString();
}

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
