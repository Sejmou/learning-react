import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Layout from '../../components/layout/Layout';

const NewMeetupPage = () => {
  function addMetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return (
    <Layout>
      <NewMeetupForm onAddMeetup={addMetupHandler} />
    </Layout>
  );
};
export default NewMeetupPage;
