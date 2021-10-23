import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import './Expenses.css';

import { useState } from 'react';

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2021');
    
    const filterSelectionChangeHandler = (newSelection) => {
        console.log(newSelection);
        setFilteredYear(newSelection);
    }

    return(
        <Card className="expenses">
            <ExpensesFilter selection={filteredYear} onSelectionChange={filterSelectionChangeHandler} />
            {props.items.map(expense => (
                <ExpenseItem
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}/>
            ))}
        </Card>
    )
}

export default Expenses;