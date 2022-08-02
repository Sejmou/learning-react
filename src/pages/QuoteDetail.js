import { Route, useParams } from 'react-router-dom';

import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const quoteId = useParams().quoteId;
  return (
    <>
      <h1>Details for quote ID {quoteId}</h1>
      <Route path="/quotes/:quoteId/comments">
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetail;
