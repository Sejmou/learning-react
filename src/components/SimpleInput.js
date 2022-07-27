import { useRef, useState } from 'react';

const SimpleInput = props => {
  // when to use ref vs. state?
  // ref is useful when we need to access input only on submission
  // if we want to reset the input value, the more "React-ish" approach is binding its value to a state variable and resetting the state variable
  // manipulating the input's value directly is considered bad practice
  // reasoning behind that: "If you're manipulating the DOM directly, why are you even using React?"
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);

    setEnteredNameIsValid(event.target.value.trim() !== '');
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
  };

  const formSubmissionHandler = event => {
    event.preventDefault(); // prevent default behavior of submitting to server serving the HTML -> would result in page reload and losing state

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);

    console.log('current value of state variable for name:', enteredName);
    const inputRefVal = nameInputRef.current.value; // current stores reference to input element -> access its value
    console.log('current value of input ref:', inputRefVal);
  };

  const nameInputIsInvalid = enteredNameTouched && !enteredNameIsValid;

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          ref={nameInputRef} // in practice wwe would not use both change handler and ref!
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
