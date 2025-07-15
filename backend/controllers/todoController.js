import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({ ...req.body, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send('Task Deleted');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
