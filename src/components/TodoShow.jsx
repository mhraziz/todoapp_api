import { useState } from 'react';
import TodoEdit from './TodoEdit';
import EditIcon from '../svgs/edit.svg';
import DeleteIcon from '../svgs/delete.svg';

const TodoShow = ({ todo, removeTodo, changeTodo }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, title) => {
    changeTodo(id, title);
    setShowEdit(false);
  };

  const handleDoubleClick = () => {
    changeTodo(todo.id, todo.title, !todo.completed);
  };

  if (showEdit) {
    return (
      <li className="todo">
        <TodoEdit todo={todo} onSubmit={handleSubmit} />
      </li>
    );
  } else {
    return (
      <li className="todo">
        <p
          className={todo.completed ? 'completed' : 'open'}
          onDoubleClick={handleDoubleClick}
          tabIndex="0" // Allows focusing for keyboard accessibility
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDoubleClick();
            }
          }}
        >
          {todo.title}
        </p>

        <div className="actions">
          <button onClick={handleDelete} aria-label="Delete todo">
            <img src={DeleteIcon} alt="Delete" />
          </button>
          <button onClick={handleEdit} aria-label="Edit todo">
            <img src={EditIcon} alt="Edit" />
          </button>
        </div>
      </li>
    );
  }
};

export default TodoShow;

