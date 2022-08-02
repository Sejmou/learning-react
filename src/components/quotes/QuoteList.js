import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = props => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // makes queryParams accesible via get()

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const changeSortingHandler = () => {
    history.push(`/quotes?sort=${isSortingAscending ? 'desc' : 'asc'}`);
  };

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

function sortQuotes(quotes, ascending) {
  // using spread syntax to make sure copy of original array is sorted (not essential here)
  return [...quotes].sort((a, b) =>
    ascending ? (a.id > b.id ? 1 : -1) : a.id < b.id ? 1 : -1
  );
}

export default QuoteList;
