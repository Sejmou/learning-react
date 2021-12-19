import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(), // not perfect way to create random ID, but good enough for us
    };

    setIsEditing(() => false);

    //pass expenseData on to parent component
    props.onAddExpense(expenseData);
  };

  const startEditingHandler = () => setIsEditing(() => true);
  const stopEditingHandler = () => setIsEditing(() => false);

  return (
    <div className='new-expense'>
      {isEditing ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      ) : (
        <button onClick={startEditingHandler}>Add new expense</button>
      )}
    </div>
  );
}

export default NewExpense;
