import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const todos = [
    new Todo('Learn React'),
    new Todo('Learn Next.js'),
    new Todo('Learn everything'),
  ];

  return <Todos todos={todos} />;
}

export default App;
