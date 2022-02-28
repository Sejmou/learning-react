import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  console.log('Button reevaluated!');

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// See DemoOutput for a brief explanation of memo
// Notice how, contrary to DemoOutput, this component function gets reevaluated even though seemingly nothing changed in the props!?
// This has to do with the fact that "By default it will only shallowly compare complex objects in the props object" (https://reactjs.org/docs/react-api.html#reactmemo)
// So, per default memo works in the way one would intuitively expect only with primitive types but not with objects (and therefore also not with functions or arrays!)
// We get around this issue by using the useCallback hook (see App component comment for details)
export default React.memo(Button);
