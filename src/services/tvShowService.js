// frontend/src/services/movieService.js

import api from './api';  // your axios instance with baseURL set

// Fetch all movies
export const getTVShows = (token) =>
  api
    .get('/library/tvshows', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch distinct genres
export const getGenres = (token) =>
  api
    .get('/library/tvshows/genres', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch counts by status
export const getTVShowCounts = (token) =>
  api
    .get('/library/tvshows/count', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Add a new movie
export const addTVShow = (tvShowData, token) =>
  api
    .post('/library/tvshows', tvShowData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const deleteTVShow = (tvShowId, token) =>
  api
    .delete(`/library/tvshows/${tvShowId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((res) => res.data);
