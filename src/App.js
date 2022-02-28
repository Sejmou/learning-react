import React, { useCallback, useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  console.log('App reevaluated!');

  // useCallback solves our issue with "wrong prop change detection" for functions passed as props
  // the reference to the function object passed to the Button will stay the same
  // no structuraly identical function object (but with different reference!) will be recreated on component reevaluation!
  // React will store the function internally and always pass the same callback on as prop
  // The only exception would be if any dependency in the array we pass as second argument changed (empty in our case -> no deps!)
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph(prevShowParagraph => !prevShowParagraph);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput showSpecialText={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
