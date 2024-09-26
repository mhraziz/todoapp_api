// src/context/TodoContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const TodoContext = createContext();

// Create a provider component
const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('https://192.168.100.33:45455/todominimal_api/Todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async (todo) => {
    try {
      const response = await axios.post('https://192.168.100.33:45455/todominimal_api/AddTodo', todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await axios.put('https://192.168.100.33:45455/todominimal_api/UpdateTodo', updatedTodo);
      setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://192.168.100.33:45455/todominimal_api/DeleteTodo?id=${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
