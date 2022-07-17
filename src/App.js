import React, { useCallback, useMemo, useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoList from './components/Demo/DemoList';

import './App.css';

function App() {
  console.log('App evaluated!');
  const [listTitle, setListTitle] = useState('Title A');

  const listTitleChangeHandler = useCallback(
    () =>
      setListTitle(oldTitle =>
        oldTitle === 'Title A' ? 'Title B' : 'Title A'
      ),
    []
  );

  const listItems = useMemo(() => [5, 3, 8, 2, 1], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={listTitleChangeHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
