import { useRouter } from 'next/router';

// this component is now rendered for any subpage of /news (e.g. /news/abc, /news/123)
const Details = () => {
  const router = useRouter();

  console.log(router.query.id); // will log twice, once with undefined bc router runs even before it knows the query params too

  // could use the id to fetch some data

  return (
    <div>
      Here we might some day find details about the news item with ID{' '}
      {router.query.id}
    </div>
  );
};
export default Details;
