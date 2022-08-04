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
    // remember: fallback defines behavior for pages that did not exist at build time (when static paths were defined)
    // fallback === false -> any other paths will return 404
    // fallback === true -> serves fallback page (need to check for isFallback prop in page (accessible via router) and display "safe loading page")
    //                      in the background, Next.js loads required HTML + JSON for page rendered with SSR using getStaticProps()
    //                      as soon as required data is there, it is returned to the client and the fallback is replaced with the actual page
    //                      on subsequent calls to the route, the statically pre-rendered page is served, just like the pages created at build time
    // fallback === 'blocking' -> iiuc, client doesn't receive anything until whole HTML page is loaded on the server and delivered to it
    //                            rest of behavior pretty much the same as with fallback === true?
    // with fallback === true we would need to provide some other intermediate content until the page is loaded
    // Note: behavior is NOT the same in development build - there, even with fallback === false we would see the page
    // more details: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    fallback: 'blocking',
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
    revalidate: 60, // it's a good idea to keep that in here, otherwise pages would become stale if the meetup data were to actually change in the DB
  };
}

export default MeetupDetailsPage;
