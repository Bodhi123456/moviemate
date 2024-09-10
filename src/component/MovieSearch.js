// src/MovieSearch.js
import React, { useState } from 'react';

const API_KEY = '6ca042e0'; 

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleRefresh =(e)=>{
    e.preventDefault();
    setQuery('');
    setMovies([]);
    setSelectedMovie([]);

    var content = document.querySelector('.movie-details');
    var button = document.querySelector('.Refresh-button');
    if (content.style.display === 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
  }

  const handleSearch = async () => {
    if (query.trim() === '') return;

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
        setSelectedMovie(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  const handleMovieClick = async (id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setSelectedMovie(null);
        setError(data.Error);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="movie-search">
      <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <button onClick={handleRefresh} className="Refresh-button">X</button>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.imdbID)}>
                <h3>{movie.Title} ({movie.Year})</h3>
                <img src={movie.Poster} alt={movie.Title} className="movie-poster"/>
                {/* <span className="movie-plot">Plot: {movie.Plot || 'No plot available'}</span>
                <p>Actors: {movie.Actors}</p>
                <p>Genre: {movie.Genre}</p>
                <p>IMDB rating: {movie.imdbRating}</p> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title} {selectedMovie.Year}</h2>
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="movie-detail-poster"
          />
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <p><strong>IMDb Rating:</strong> {selectedMovie.imdbRating}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Released:</strong> {selectedMovie.Released}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
