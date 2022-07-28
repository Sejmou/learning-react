import { useState } from 'react';

const useInput = ({ id, label, type, validateValue, errorMessage }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const changeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = event => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    id,
    label,
    type,
    errorMessage,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
