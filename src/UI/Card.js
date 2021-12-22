import styles from './Card.module.css';

const Card = props => {
  return (
    <div
      className={
        `${styles.card} ${props.className}` /* pass on className passed to component to div */
      }
    >
      {props.children}
    </div>
  );
};

export default Card;
