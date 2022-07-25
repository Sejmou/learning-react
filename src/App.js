import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useBackend from './hooks/useBackend';

function App() {
  const [tasks, setTasks] = useState([]);
  const [fetchTasks, isLoading, error] = useBackend({
    endpointName: 'tasks',
    successCallback: loadedTasks => setTasks(loadedTasks),
  });

  useEffect(() => fetchTasks(), [fetchTasks]);

  const taskAddHandler = task => {
    console.log('new task', task);
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
