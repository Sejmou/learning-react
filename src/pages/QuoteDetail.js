import { useParams } from 'react-router-dom';

const QuoteDetail = () => {
  const quoteId = useParams().quoteId;
  return <div>Details for quote ID {quoteId}</div>;
};
export default QuoteDetail;
