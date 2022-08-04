// note: this import will NOT be added to the client bundle
//Next.js checks the usage of imports and only adds to client bundle if they are actually used in client code as well
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
  const { meetups } = props;

  return <MeetupList meetups={meetups} />;
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
