import React from 'react';

const DemoOutput = props => {
  console.log('DemoOutput reevaluated!');

  return <p>{props.showSpecialText ? 'Special demo text' : 'Regular text'}</p>;
};

// using React.memo allows us to tell React that it should not always reevaluate this component
// when any parent component that uses it is reevaluated.
// Instead, React reuses the last rendered result this component function returned, as long as the props didn't change.
export default React.memo(DemoOutput);
