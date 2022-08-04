import NewMeetupForm from '../../components/meetups/NewMeetupForm';
const NewMeetupPage = () => {
  function addMetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMetupHandler} />;
};
export default NewMeetupPage;
