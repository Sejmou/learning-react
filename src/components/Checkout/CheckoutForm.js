import React from 'react';
import Input from '../UI/Input';
import useInput from '../../hooks/use-input';

const CheckoutForm = () => {
  const inputProps = [
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

  const inputs = inputProps.map(props => <Input {...props} />);

  return <form>{inputs}</form>;
};

function isNonEmpty(inputValue) {
  return inputValue.trim() !== '';
}

function containsOnlyDigits(inputValue) {
  return /^\d+$/.test(inputValue);
}

export default CheckoutForm;
