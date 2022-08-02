import { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const quoteId = match.params.quoteId;

  const {
    status,
    sendRequest,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const quotePath = match.path;
  const commentsPath = `${quotePath}/comments`;
  const commentsURL = `${match.url}/comments`;

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === 'completed' && !loadedQuote) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={quotePath} exact>
        <div className="centered">
          <Link className="btn--flat" to={commentsURL}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={commentsPath}>
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetail;
