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
        // instead of providing new state object relying on userInput directly, we pass a function
        // it returns new state based on the previous state
        // reason for doing this: state in React doesn't update immediately, updates are scheduled
        // it might be that the state snapshot userInput is already out of date when this particular state update is completed
        // therefore we could lose previous state changes (not concerning enteredTitle)
        setUserInput((prevState) => ({
            ...prevState,
            enteredTitle: event.target.value
        }));
    };

    const amountChangeHandler = (event) => {
        setUserInput((prevState) => ({
            ...prevState,
            enteredAmount: event.target.value
        }));
    };

    const dateChangeHandler = (event) => {
        setUserInput((prevState) => ({
            ...prevState,
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