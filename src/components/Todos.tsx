const Todos: React.FC<{ todos: string[] }> = props => {
  return (
    <ul>
      {props.todos.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
};
export default Todos;
