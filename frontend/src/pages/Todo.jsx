import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import TodoList from '../components/TodoList';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await API.get('/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const res = await API.post('/todos', { title: task });
    setTodos([res.data, ...todos]);
    setTask('');
  };

  const handleToggle = async (id, completed) => {
    const res = await API.put(`/todos/${id}`, { completed: !completed });
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEdit = async (id, newTitle) => {
    const res = await API.put(`/todos/${id}`, { title: newTitle });
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            My Todos
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Add
          </button>
        </form>

        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Todo;
