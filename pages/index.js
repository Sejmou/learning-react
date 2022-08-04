import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

const HomePage = props => {
  const { meetups } = props; // the meetups prop is a static prop returned by getStaticProps!
  // if we inspect the initial page source, we notice that our DUMMY_MEETUPS are contained in it
  // this means that the server already returned the data and it was NOT added on the client-side

  return <MeetupList meetups={meetups} />;
};

// this function allows us to work around problem outlined in previous lesson: pre-loading sites with data
// if our data does not change that often, we can  fetch it as part of the build process by exporting this function
// inside that (async) function, we can fetch the data and return it as "static props"
// during the build process, Next.js will wait for the Promise created by this function to resolve
// then, a static page using those static props will be created which is initially served to clients requesting data from this page!
// this function is executed on the server, NOT on the client!
// Advantage of this approach: SEO works perfectly as the data is in the initial page source as well and not fetched by the client!
// Disadvantage: need to rebuild whole app to get updated static props -> if that is a problem and we still need SEO, SSR is an alternative (explained later)
export async function getStaticProps() {
  // in realistic scenarios, you would probably await an HTTP response here
  // once done, return an object with props property that contains the static props you want to use on the page
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
