import Todo from '../models/todo';
import TodoItem from './TodoItem';

const Todos: React.FC<{ todos: Todo[] }> = props => {
  return (
    <ul>
      {props.todos.map(todo => (
        <TodoItem key={todo.text} text={todo.text} />
      ))}
    </ul>
  );
};
export default Todos;
