import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

function NewExpense(props) {
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()// not perfect way to create random ID, but good enough for us 
        }

        //pass expenseData on to parent component
        props.onAddExpense(expenseData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
        </div>
    )
}

export default NewExpense;