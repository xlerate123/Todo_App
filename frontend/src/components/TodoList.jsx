import { useState } from 'react';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditedTitle(todo.title);
  };

  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      onEdit(editingId, editedTitle);
      setEditingId(null);
    }
  };

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-md shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo._id, todo.completed)}
              className="w-5 h-5 cursor-pointer"
            />
            {editingId === todo._id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border px-2 py-1 rounded-md"
              />
            ) : (
              <span
                className={`text-lg ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {todo.title}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {editingId === todo._id ? (
              <>
                <button
                  onClick={handleEditSubmit}
                  className="text-green-600 font-semibold hover:underline cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 font-semibold hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEditing(todo)}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo._id)}
                  className="text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
