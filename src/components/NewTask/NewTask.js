import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = props => {
  const { isLoading, error, sendRequest } = useHttp();

  const enterTaskHandler = async taskText => {
    const httpConfig = {
      url: 'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        text: taskText,
      },
    };

    const createTaskFromResponse = data => {
      const generatedId = data.name;
      const createdTask = {
        id: generatedId,
        text: taskText,
      };
      props.onAddTask(createdTask);
    };

    sendRequest(httpConfig, createTaskFromResponse);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
