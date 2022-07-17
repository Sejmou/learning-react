import React, { useMemo } from 'react';

const DemoList = props => {
  console.log('DemoList evaluated!');
  const { items } = props;

  // why useMemo()? We don't want to sort the items every time another prop that has nothing to do with the items (like the title in this case) changes!
  // useMemo() is generally useful whenever a component accepts several props and there's a prop where a change results in an expensive operation (such as sorting a lot of items)
  // we don't want to trigger the expensive operation if that prop actually did not change at all!
  const sortedList = useMemo(() => {
    console.log('sorting items passed to DemoList');
    return items.sort((a, b) => a - b);
  }, [items]);

  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
