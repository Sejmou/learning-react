import React, { useEffect, useState, useCallback, useMemo } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const httpConfig = useMemo(
    () => ({
      url: 'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
    }),
    []
  );

  const transformTasks = useCallback(tasksObj => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(httpConfig, transformTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // need to add the function we call in useEffect as dependency because React is complaining - cannot know whether this function uses some component state or not
  // before, React could easily figure that out as the function logic was contained in the same file (not a file that is imported)
  // Problem: As the function returned by the custom hook updates internal component state, it would be recreated every time in the custom hook as the function would be reexecuted
  // -> needed to make some adjustments in the custom hook to counter this

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
