// frontend/src/services/bookService.js

import api from './api';  // your axios instance with baseURL set

// Fetch all books
export const getBooks = (token) =>
  api
    .get('/library/books', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch distinct genres
export const getGenres = (token) =>
  api
    .get('/library/books/genres', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Fetch counts by status
export const getBookCounts = (token) =>
  api
    .get('/library/books/count', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

// Add a new book
export const addBook = (bookData, token) =>
  api
    .post('/library/books', bookData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

export const deleteBook = (bookId, token) =>
  api
    .delete(`/library/books/${bookId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((res) => res.data);
