import { Route, useParams, Link } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

// will be removed later once we use a backend to fetch actual data
const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
  const quoteId = useParams().quoteId;

  const quote = DUMMY_QUOTES.find(quote => quote.id === quoteId);
  const quotePath = `/quotes/${quoteId}`;
  const commentsPath = `${quotePath}/comments`;

  if (!quote) {
    return <p>Quote not found :/</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={quotePath} exact>
        <div className="centered">
          <Link className="btn--flat" to={commentsPath}>
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
