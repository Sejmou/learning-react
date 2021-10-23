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
            <ExpenseItem
                title={props.items[0].title}
                amount={props.items[0].amount}
                date={props.items[0].date}/>
            <ExpenseItem
                title={props.items[1].title}
                amount={props.items[1].amount}
                date={props.items[1].date}/>
        </Card>
    )
}

export default Expenses;