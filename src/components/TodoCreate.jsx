// src/components/TodoCreate.js
import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const TodoCreate = () => {
  const [title, setTitle] = useState('');
  const { createTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ todo1: title, completed: "NO" });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-create">
      <input
        type="text"
        placeholder="Enter a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoCreate;
