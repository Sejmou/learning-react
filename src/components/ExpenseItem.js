import './ExpenseItem.css';

function ExpenseItem(props) {// React components get all input props via props object

    return (
        <div className="expense-item">
            <div>{props.date.toISOString()}</div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">{props.amount}</div>
            </div>
        </div>
    );
}

export default ExpenseItem;