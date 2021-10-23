import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

function ExpensesList(props) {
    if (props.items.length === 0) return <h2 className="expenses-list__fallback">No expenses found</h2>;

    return (
        <ul className="expenses-list">
            {props.items.map(expense => (
            <li>
                <ExpenseItem
                    key={expense.id}// important so list rendering is more efficient and will work correctly http://localhost:3000/
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}/>
            </li>
            ))}
        </ul>
    )
}

export default ExpensesList;