import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import Card from '../UI/Card';
import './Expenses.css';

import { useState } from 'react';

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2021');
    
    const filterSelectionChangeHandler = (newSelection) => {
        console.log(newSelection);
        setFilteredYear(newSelection);
    }

    const filteredItems = props.items.filter(expense => expense.date.getFullYear() === +filteredYear);

    return(
        <Card className="expenses">
            <ExpensesFilter selection={filteredYear} onSelectionChange={filterSelectionChangeHandler} />
            <ExpensesList items={filteredItems} />
        </Card>
    )
}

export default Expenses;