import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import Card from '../UI/Card';
import './Expenses.css';

import { useState } from 'react';

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2021');

  const filterSelectionChangeHandler = (newSelection) =>
    setFilteredYear(newSelection);

  const filteredExpenses = props.items.filter(
    (expense) => expense.date.getFullYear() === +filteredYear
  );

  return (
    <Card className='expenses'>
      <ExpensesFilter
        selection={filteredYear}
        onSelectionChange={filterSelectionChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
