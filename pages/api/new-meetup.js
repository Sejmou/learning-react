import { MongoClient } from 'mongodb';

// this file defines the backend API endpoint /api/new-meetup
// sending requests to this endpoint will trigger the default export function we define here

// the signature of this function will look familiar to Node.js/Express developers
// see here for example of how to write this: https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
export default async function handler(req, res) {
  console.log(
    'incoming request to /api/new-meetup:',
    req.method,
    'w/ body',
    req.body
  );
  if (req.method === 'POST') {
    const data = req.body;

    // simple validation
    const { title, image, address, description } = data;
    for (const prop of [title, image, address, description]) {
      if (!prop || typeof prop !== 'string') {
        //TODO: properly validate address + image url
        console.log('data is invalid!');
        return res.status(400).end();
      }
    }

    // remember: this code runs on the server only!
    // this is important as we NEVER should expose backend DB credentials on the frontend
    try {
      const client = await MongoClient.connect(
        'mongodb+srv://Sejmou:tryingmongowithnextjs@cluster0.bah7j.mongodb.net/meetup-app?retryWrites=true&w=majority'
      );
      const db = client.db();
      const meetupsCollection = db.collection('meetups');

      try {
        const result = await meetupsCollection.insertOne({
          title,
          image,
          address,
          description,
        });
        console.log('DB result obj', result);

        // 201 Status Code === "Created"
        return res.status(201).json({ id: result.insertedId });
      } catch (error) {
        console.log('An error occurred while accessing the database', error);
        return res.status(500).end();
      } finally {
        client.close();
      }
    } catch (error) {
      console.log('An error occurred while connecting to database', error);
      return res.status(500).end();
    }
  }

  return res.status(404).end();
}
