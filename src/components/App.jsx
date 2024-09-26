// src/components/App.js
import { TodoProvider } from '../context/TodoContext';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import '../styles/App.css';

const App = () => {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Todo List</h1>
        <TodoCreate />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
