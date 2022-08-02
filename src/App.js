import { Route, Switch } from 'react-router-dom';
import MainNavigation from './components/layout/MainNavigation';

function App() {
  return (
    <>
      <MainNavigation />
      <main>
        <div>
          <Switch>
            <Route path="/quotes" exact>
              Quotes Main Page comes here
            </Route>
            <Route path="/quotes/:quoteId">Quote Subpage comes here</Route>
            <Route path="/new-quote">New Quote Page comes here</Route>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
