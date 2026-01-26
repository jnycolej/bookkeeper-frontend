// frontend/src/services/movieService.js

import api from './api';  // your axios instance with baseURL set

// Fetch all movies
export const getMovies = (token) =>
  api
    .get('/library/movies', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch distinct genres
export const getGenres = (token) =>
  api
    .get('/library/movies/genres', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch counts by status
export const getMovieCounts = (token) =>
  api
    .get('/library/movies/count', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Add a new movie
export const addMovie = (movieData, token) =>
  api
    .post('/library/movies', movieData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const deleteMovie = (movieId, token) =>
  api
    .delete(`library/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((res) => res.data);
