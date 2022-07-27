import { useRef, useState } from 'react';

const SimpleInput = props => {
  // when to use ref vs. state?
  // ref is useful when we need to access input only on submission
  // if we want to reset the input value, the more "React-ish" approach is binding its value to a state variable and resetting the state variable
  // manipulating the input's value directly is considered bad practice
  // reasoning behind that: "If you're manipulating the DOM directly, why are you even using React?"
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault(); // prevent default behavior of submitting to server serving the HTML -> would result in page reload and losing state
    console.log('current value of state variable for name:', enteredName);
    const inputRefVal = nameInputRef.current.value; // current stores reference to input element -> access its value
    console.log('current value of input ref:', inputRefVal);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          ref={nameInputRef} // in practice wwe would not use both change handler and ref!
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
