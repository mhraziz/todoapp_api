export const getTodos = async (setTodos) => {
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
  
      const storedTodos = await response.json();
      // Update the state
      if (storedTodos) setTodos(storedTodos);
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };
  
  export const createTodo = async (title, setTodos) => {
    // form a new todo
    const newTodo = {
      title: title,
      completed: false,
    };
  
    // call an API to create a new todo
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
  
      // set a new state
      const updatedTodos = [...todos, storedTodo];
  
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error creating a todo:', error);
    }
  };
  
  export const removeTodo = async (id, setTodos) => {
    // Delete the todo
    const url = 'https://dummyjson.com/todos/1';
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      // Update the state
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error during DELETE request:', error);
      throw error;
    }
  };
  
  export const changeTodo = async (id, newTitle, completed = false, setTodos) => {
    // Update todo
    const url = 'https://dummyjson.com/todos/1';
  
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
  
      // Update the state
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...updatedTodo };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error during PUT request:', error);
      throw error;
    }
  };
  