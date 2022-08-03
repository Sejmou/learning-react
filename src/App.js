import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// those components are almost guaranteed to be used in the App
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import AllQuotes from './pages/AllQuotes';

// those components maybe aren't even needed  for most use-cases (most users might just look at the main page)
// -> fetch those components from the server lazily (i.e. only when they are actually needed bc the user navigates to the route they're on)
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      {/* Of course, React needs to show something while the lazy-loaded components are being fetched
          -> provide a JSX element as fallback prop of Suspense, wrap lazy-loaded components with Suspense */}
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
