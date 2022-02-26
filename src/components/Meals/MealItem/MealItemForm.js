import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useState, useRef } from 'react';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef(); // remember: had to add forwardRef to Input to make this work

  const amountMin = 1;
  const amountMax = 99;

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value; // current will point at HTML input in Input
    const enteredAmountNo = +enteredAmount; // value is always a string, convert!

    if (
      enteredAmount.trim().length == 0 ||
      enteredAmountNo < amountMin ||
      enteredAmount > amountMax
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNo); // we only have amount of item here, not ID or price -> pass logic as prop!
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: amountMin.toString(),
          max: amountMax.toString(),
          step: '1',
          defaultValue: '1',
        }}
      />
      {!amountIsValid && (
        <p>
          Please enter a valid amount ({amountMin}-{amountMax})
        </p>
      )}
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
