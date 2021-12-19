import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

function ExpensesList(props) {
    if (props.items.length === 0) return <h2 className="expenses-list__fallback">No expenses found</h2>;

    return (
        <ul className="expenses-list">
            {props.items.map(expense => (
            <li key={expense.id}// note: "key" attribute has to always be set on "top-most" tag: https://stackoverflow.com/a/41365974/13727176
            >
                <ExpenseItem
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}/>
            </li>
            ))}
        </ul>
    )
}

export default ExpensesList;