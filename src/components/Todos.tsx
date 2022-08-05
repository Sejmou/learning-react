import { useContext } from 'react';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';
import { TodoContext } from '../store/todo-context';

const Todos: React.FC = props => {
  const ctx = useContext(TodoContext);

  return (
    <ul className={classes.todos}>
      {ctx.items.map(todo => (
        <TodoItem
          key={todo.text}
          text={todo.text}
          onRemove={ctx.remove.bind(null, todo.id)}
        />
      ))}
    </ul>
  );
};
export default Todos;
