import useBackend from '../../hooks/useBackend';
// import useHttp from '../../hooks/use-http';
// import { useMemo, useCallback, useState, useEffect } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = props => {
  const [enterTaskHandler, isLoading, error] = useBackend({
    endpointName: 'tasks',
    postDataExtractionFn: taskText => ({ text: taskText }),
    successCallback: props.onAddTask,
  });

  // note: the usage of useHttp for this component was not explained in the tutorial at this point
  // this is my own attempt at using it that unfortunately is just a mindf*ck and does not work at all
  // probably the useHttp hook is not really working for this use case in its current state lol
  // const [taskText, setTaskText] = useState('');

  // const httpConfig = useMemo(
  //   () => ({
  //     url: 'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: { text: taskText },
  //   }),
  //   [taskText]
  // );

  // const transformSuccessResponse = useCallback(
  //   data => {
  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };
  //     props.onAddTask(createdTask);
  //   },
  //   [props, taskText]
  // );

  // const { isLoading, error, sendRequest } = useHttp(
  //   httpConfig,
  //   transformSuccessResponse
  // );

  // const enterTaskHandler = async taskText => {
  //   setTaskText(taskText);
  //   // not working as state update does not happen inside this function directly and is merely scheduled for next component evaluation
  //   // so, sendRequest still has the old taskText
  //   sendRequest();
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
