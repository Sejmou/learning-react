import useBackend from '../../hooks/useBackend';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = props => {
  const [enterTaskHandler, isLoading, error] = useBackend({
    endpointName: 'tasks',
    postDataExtractionFn: taskText => ({ text: taskText }),
    successCallback: props.onAddTask,
  });

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
