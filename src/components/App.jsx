import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { useEffect, useState } from 'react';
import '../styles/App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const url = 'https://dummyjson.com/todos';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Ensure you access the correct key to get the array of todos
      const storedTodos = data.todos;

      // Update the state with the correct data
      if (Array.isArray(storedTodos)) {
        setTodos(storedTodos);
      } else {
        console.error('Todos data is not an array:', storedTodos);
      }
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  const createTodo = async (title) => {
    const newTodo = {
      title: title,
      completed: false,
    };

    const url = 'https://dummyjson.com/todos/add';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const storedTodo = await response.json();

      // Update the state with the new todo
      setTodos([...todos, storedTodo]);
    } catch (error) {
      console.error('Error creating a todo:', error);
    }
  };

  const removeTodo = async (id) => {
    // Correct the URL to use the actual todo ID
    const url = `https://dummyjson.com/todos/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');

      // Update the state to remove the deleted todo
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error during DELETE request:', error);
    }
  };

  const changeTodo = async (id, newTitle, completed = false) => {
    // Correct the URL to use the actual todo ID
    const url = `https://dummyjson.com/todos/${id}`;

    const data = { title: newTitle, completed };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedTodo = await response.json();

      // Update the state to reflect the changes
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
      );
    } catch (error) {
      console.error('Error during PUT request:', error);
    }
  };

  return (
    <main className="main">
      <h1>
        React Todo <span>Streamline Your Day, the React Way!</span>
      </h1>
      <TodoList todos={todos} removeTodo={removeTodo} changeTodo={changeTodo} />
      <TodoCreate createTodo={createTodo} />
    </main>
  );
};

export default App;


   
   












