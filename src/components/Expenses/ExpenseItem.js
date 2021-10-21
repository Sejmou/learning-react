import { useState } from 'react'; 

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

function ExpenseItem(props) {// React components get all input props via props object
    //useState returns an array: [prop, prop update function]
    const [title, setTitle] = useState(props.title);
    const clickHandler = () => {
        //we call the prop update function. This schedules a prop update
        //Once done, the component function is reevaluated and we can see the new prop value as well
        setTitle('New title!');
    };
    
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">{props.amount}</div>
            </div>
            <button onClick={clickHandler}>Change title</button>
        </Card>
    );
}

export default ExpenseItem;