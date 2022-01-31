import classes from './Input.module.css';

const Input = props => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input} /*spread operator allows other input props to be set automatically*/
      />
    </div>
  );
};

export default Input;
