import React, { useState } from 'react';
import Todo from '../models/todo';

interface TodoContextProps {
  items: Todo[];
  add: (text: string) => void;
  remove: (id: string) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
  items: [],
  add: () => {},
  remove: () => {},
});

const TodoContextProvider: React.FC = props => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos(prev => [...prev, newTodo]);
  };

  const removeTodoHandler = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const context: TodoContextProps = {
    items: todos,
    add: addTodoHandler,
    remove: removeTodoHandler,
  };

  return (
    <TodoContext.Provider value={context}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
