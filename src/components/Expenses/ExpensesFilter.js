import './ExpensesFilter.css';

function ExpensesFilter(props) {
    const changeHandler = (ev) => {
        props.onSelectionChange(ev.target.value);
    }

    return (
        <div className="expenses-filter expenses-filter__control">
            <label htmlFor="">Filter by year</label>
            <select value={props.selection} onChange={changeHandler}>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
        </div>
    );
}

export default ExpensesFilter;