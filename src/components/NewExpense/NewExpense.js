import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';

function NewExpense(props) {
  const [showForm, setShowForm] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(), // not perfect way to create random ID, but good enough for us
    };

    setShowForm(() => false);

    //pass expenseData on to parent component
    props.onAddExpense(expenseData);
  };

  const startAddExpenseBtnClickHandler = () => setShowForm(() => true);
  const formCancelClickHandler = () => setShowForm(() => false);

  return (
    <div className='new-expense'>
      {showForm ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancelClicked={formCancelClickHandler}
        />
      ) : (
        <button onClick={startAddExpenseBtnClickHandler}>
          Add new expense
        </button>
      )}
    </div>
  );
}

export default NewExpense;
