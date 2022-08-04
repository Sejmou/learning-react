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
  const { meetups } = props;

  return <MeetupList meetups={meetups} />;
};

// getServerSideProps is an alternative to getStaticProps
// the difference is that we use Server-Side-Rendering (SSR) instead of Static Site Generation (SSG)
// for every incoming request, the server gets the current data (fetched and returned inside this function) and forwards it to the page component as props
// export async function getServerSideProps(context) {
//   // we also have access to request context (don't know what exactly that means at this point, Node.js developers might know more about that already)
//   // const req = context.req;
//   // const res = context.res;

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

// for this particular type of page (not-so-frequent updates), getStaticProps is actually probably the smarter choice
// we can make use of caching and CDNs for serving truely static sites, which makes requests much faster
export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 60,
  };
}

export default HomePage;
