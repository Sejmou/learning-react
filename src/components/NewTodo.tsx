import { useRef } from 'react';

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = props => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // use ! to tell TS that we are sure current will be defined
    const enteredText = inputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="text"></label>
        <input id="text" type="text" ref={inputRef} />
      </div>
      <button>Add Todo</button>
    </form>
  );
};
export default NewTodo;
