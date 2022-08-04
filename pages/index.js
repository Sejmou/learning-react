import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
  const { meetups } = props;

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://Sejmou:tryingmongowithnextjs@cluster0.bah7j.mongodb.net/meetup-app?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = (await meetupsCollection.find().toArray()).map(meetup => {
    const { _id, ...data } = meetup;
    return {
      ...data,
      id: _id.toString(),
    };
  });

  return {
    props: {
      meetups,
    },
    revalidate: 60,
  };
}

export default HomePage;
