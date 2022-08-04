// this file defines the backend API endpoint /api/new-meetup
// sending requests to this endpoint will trigger the default export function we define here

// the signature of this function will look familiar to Node.js/Express developers
// see here for example of how to write this: https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // POST /api/new-meetup
    const data = req.body;
    console.log('received data', data);
    // TODO: actually handle request
    return res.end();
  }

  return res.status(404).end();
}
