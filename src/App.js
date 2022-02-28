import React, { useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  console.log('App reevaluated!');

  const toggleParagraphHandler = () => {
    setShowParagraph(prevShowParagraph => !prevShowParagraph);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/*Note: DemoOutput is reevaluated on every state change despite passed value same!
         This is to be expected as reevaluation of a component function causes all child component functions to be called as well
         Note that re-evaluation of a component function doesn't necessarily cause "rerendering of the component in the DOM" */}
      <DemoOutput showSpecialText={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
