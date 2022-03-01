import React, { useCallback, useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {
  // Q: why is state not "recreated" on every call to useState()?
  // A: Upon first execution of component function, React stores some kind of mapping of component instance -> state
  // Therefore, the default value of useState is only really taken into account when the component function is executed the first time
  // Basically, the default value assignment is then always "skipped", except if a component was completely removed from the DOM in the meantime?
  const [allowToggle, setAllowToggle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  console.log('App reevaluated!');

  const allowToggleHandler = useCallback(() => setAllowToggle(true), []);

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
