import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Counter.module.css';

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>
          Toggle Counter
        </button>
      </main>
    );
  }
}

// the effect of this is basically the same as the useSelector() call when using hooks in functional components?
const mapStateToProps = state => {
  return { counter: state.counter };
};

// ... and this is basically equivalent to useDispatch
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
};

// connect() is a function that returns a new, enhanced component to which we should provide our component as argument
// as a result of this, both the redux state and actions we provided in the mapping functions will be available as props in the component
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
