import { useState } from 'react';

import './ExpenseForm.css';

function ExpenseForm(props) {
    // one could update state using a single object, too
    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });

    const titleChangeHandler = (event) => {
        // this state update approach discouraged, for reasons that will be explained later!
        setUserInput(({
            ...userInput,
            enteredTitle: event.target.value
        }));
    };

    const amountChangeHandler = (event) => {
        setUserInput(({
            ...userInput,
            enteredAmount: event.target.value
        }));
    };

    const dateChangeHandler = (event) => {
        setUserInput(({
            ...userInput,
            enteredDate: event.target.value
        }));
    }

    return (
        <form>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label htmlFor="">Title</label>
                    <input type="text" onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="">Amount</label>
                    <input 
                        type="number" min="0.01" step="0.01"
                        onChange={amountChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="">Date</label>
                    <input 
                        type="date" min="2019-01-01" max="2022-12-31"
                        onChange={dateChangeHandler} />
                </div>
            </div>

            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;