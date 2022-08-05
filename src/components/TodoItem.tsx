import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ text: string; onRemove: () => void }> = props => {
  return (
    <li onClick={props.onRemove} className={classes.item}>
      {props.text}
    </li>
  );
};
export default TodoItem;
