import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
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
        const response = await fetch(
          'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();

        console.log(data);

        const loadedMovies = Object.entries(data).map(([id, value]) => {
          const { title, openingText, releaseDate } = value;
          return {
            id,
            title,
            openingText,
            releaseDate,
          };
        });
        console.log(loadedMovies);

        setMovies(loadedMovies);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  const addMovieHandler = async movie => {
    console.log(movie);
    const res = await fetch(
      'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await res.json();
    console.log(data);
  };

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
