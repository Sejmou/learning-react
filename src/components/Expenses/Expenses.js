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

    const filteredItems = props.items.filter(expense => expense.date.getFullYear() == filteredYear);

    return(
        <Card className="expenses">
            <ExpensesFilter selection={filteredYear} onSelectionChange={filterSelectionChangeHandler} />
            {filteredItems.map(expense => (
                <ExpenseItem
                    key={expense.id}// important so list rendering is more efficient and will work correctly http://localhost:3000/
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}/>
            ))}
        </Card>
    )
}

export default Expenses;