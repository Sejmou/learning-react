import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const todos = [
    new Todo('Learn React'),
    new Todo('Learn Next.js'),
    new Todo('Learn everything'),
  ];

  const addTodoHandler = (todoText: string) => {
    console.log('received new TODO:', todoText);
    // TODO: implement logic for adding Todo
  };

  return (
    <div>
      <Todos todos={todos} />
      <NewTodo onAddTodo={addTodoHandler} />
    </div>
  );
}

export default App;
