import React from 'react';
import Input from '../UI/Input';
import useInput from '../../hooks/use-input';

const CheckoutForm = props => {
  const inputPropsObjs = [
    useInput({
      id: 'name',
      label: 'Your Name',
      errorMessage: 'Please provide a name',
      validateValue: isNonEmpty,
    }),
    useInput({
      id: 'street',
      label: 'Street',
      errorMessage: 'Please provide an address',
      validateValue: isNonEmpty,
    }),
    useInput({
      id: 'code',
      label: 'Postal Code',
      errorMessage: 'Please provide a valid postal code',
      validateValue: containsOnlyDigits,
    }),
    useInput({
      id: 'city',
      label: 'City',
      errorMessage: 'Please provide a city',
      validateValue: isNonEmpty,
    }),
  ];

  const inputs = inputPropsObjs.map(props => (
    <Input key={props.id} {...props} />
  ));
  const formIsValid = inputPropsObjs.every(obj => obj.isValid);
  const inputIds = inputPropsObjs.map(obj => obj.id);

  const submissionHandler = event => {
    event.preventDefault();

    // this will make any validation errors appear
    touchInputs(inputIds);

    if (formIsValid) {
      const formValue = inputPropsObjs.reduce((prev, curr) => {
        prev[curr.id] = curr.value;
        return prev;
      }, {});
      props.onSubmitSuccess(formValue);
    }
  };

  return (
    <form id={props.id} onSubmit={submissionHandler}>
      {inputs}
    </form>
  );
};

function isNonEmpty(inputValue) {
  return inputValue.trim() !== '';
}

function containsOnlyDigits(inputValue) {
  return /^\d+$/.test(inputValue);
}

// could not find a smarter way to mark all inputs as touched and (as a result) display any validation errors to the user on form submission
function touchInputs(inputIDs) {
  inputIDs.forEach(id => {
    const el = document.getElementById(id);
    el.focus();
    el.blur();
  });
}

export default CheckoutForm;
