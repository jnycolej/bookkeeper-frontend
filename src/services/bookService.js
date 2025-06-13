// frontend/src/services/bookService.js

import api from './api';  // your axios instance with baseURL set

// Fetch all books
export const getBooks = token =>
  api
    .get('/', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);

// Fetch distinct genres
export const getGenres = token =>
  api
    .get('/genres', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);

// Fetch counts by status
export const getBookCounts = token =>
  api
    .get('/count', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);

// Add a new book
export const addBook = (bookData, token) =>
  api
    .post('/', bookData, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
