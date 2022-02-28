import React, { useCallback, useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {
  const [allowToggle, setAllowToggle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  console.log('App reevaluated!');

  const allowToggleHandler = useCallback(() => setAllowToggle(true));

  // this demonstrates why the dependencies array in useCallback is actually useful/needed
  // this has to do with JavaScript closures
  // every function in JS is able to access vars from the scope it was defined in (+ "parent" scopes) as well as global variables
  // this means it kinda "caches" variable values
  // if we would leave the allowToggle variable out of the dependencies array, the toggleParagraphHandler callback would be stored in the first run of the component
  // This created callback function would then store the initial value for allowToggle!
  // It would not notice changes to the allowToggle variable as those would actually be different references to newly created allowToggle variables of each run?
  // Instead, it would use the "cached" allowToggle variable which was false and would stay false forever!
  // adding the allowToggle dep would recreate the callback with the most recent allowToggle value every time allowToggle changes
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) setShowParagraph(prevShowParagraph => !prevShowParagraph);
  }, [allowToggle]);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput showText={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow toggling paragraph</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
