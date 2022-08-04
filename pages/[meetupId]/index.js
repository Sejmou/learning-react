import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailsPage = props => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails {...props.meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Sejmou:tryingmongowithnextjs@cluster0.bah7j.mongodb.net/meetup-app?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  // find() accepts a object with filter conditions as first argument
  // second argument allows to select only certain fields (_id: 1 means "return only _id field")
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  const meetupPaths = meetupIds.map(meetup => ({
    params: { meetupId: meetup._id.toString() },
  }));

  client.close();

  return {
    fallback: false,
    paths: meetupPaths,
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(
    'mongodb+srv://Sejmou:tryingmongowithnextjs@cluster0.bah7j.mongodb.net/meetup-app?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetupDbObj = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  const { _id, ...meetupProps } = meetupDbObj;
  const meetup = { id: _id.toString(), ...meetupProps };

  client.close();

  console.log('meetup (DB obj.)', meetupDbObj);
  console.log('meetup', meetup);

  return {
    props: {
      meetupData: meetup,
    },
    revalidate: 60,
  };
}

export default MeetupDetailsPage;
