import Head from 'next/head';
import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  async function addMetupHandler(enteredMeetupData) {
    console.log('entered meetup data', enteredMeetupData);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log('meetup creation response', data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Create a new React meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMetupHandler} />
    </>
  );
};
export default NewMeetupPage;
