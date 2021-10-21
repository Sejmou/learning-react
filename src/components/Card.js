
import './Card.css';

function Card(props) {
    // if user of this component adds classes to this component, they should not be applied, too
    // doing className="card" in the div below would mean that the classes users of this component provide would be disregarded
    // so, we combine the provided classes with the .card class like this:
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>
}

export default Card;