// frontend/src/services/gameService.js

import api from './api';  // your axios instance with baseURL set

// Fetch all movies
export const getVideoGames = (token) =>
  api
    .get('/library/videogames', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch distinct genres
export const getGenres = (token) =>
  api
    .get('/library/videogames/genres', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch counts by status
export const getVideoGameCounts = (token) =>
  api
    .get('/library/videogames/count', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Add a new movie
export const addVideoGame = (gameData, token) =>
  api
    .post('/library/videogames', gameData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const deleteVideoGame = (gameId, token) =>
  api
    .delete(`/library/videogames/${gameId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((res) => res.data);
