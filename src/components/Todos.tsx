import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

const Todos: React.FC<{
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
}> = props => {
  return (
    <ul className={classes.todos}>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.text}
          text={todo.text}
          onRemove={props.onRemoveTodo.bind(null, todo.id)}
        />
      ))}
    </ul>
  );
};
export default Todos;
