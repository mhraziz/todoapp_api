// src/components/TodoItem.js
import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.todo1);
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const handleEdit = () => {
    if (isEditing) {
      updateTodo({ ...todo, todo1: title });
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <span>{todo.todo1}</span>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
