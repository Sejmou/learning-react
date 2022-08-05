import { useRef, useContext } from 'react';

import classes from './NewTodo.module.css';
import { TodoContext } from '../store/todo-context';

const NewTodo: React.FC = props => {
  const ctx = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // use ! to tell TS that we are sure current will be defined
    const enteredText = inputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    ctx.add(enteredText);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="text"></label>
        <input id="text" type="text" ref={inputRef} />
      </div>
      <button>Add Todo</button>
    </form>
  );
};
export default NewTodo;
