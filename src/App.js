import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        const transformedMovies = data.results.map(movieData => ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }));
        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  useEffect(() => fetchMoviesHandler(), [fetchMoviesHandler]); // listing fetchMoviesHandler as dep. is not really necessary here, but useful if the handler relies on external state

  let content = <p>No movies loaded! Click the button above to fetch some.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
