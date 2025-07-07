import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function BookForm() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const INITIAL_STATE = {
    title: '',
    series: '',
    author: '',
    genres: '',
    publicationYear: '',
    pageCount: '',
    status: '',
    format: '',
    rating: '',
    dateAdded: '',
    isbn10: '',
    isbn13: '',
    asin: '',
  }

  const [formData, setFormData] = useState({...INITIAL_STATE});

  const [isFormValid, setIsFormValid] = useState(false);

  // 1) Validation always returns true/false
  const validateForm = (data) => {
    const required = [
      'title',
      'author',
      'genres',
      'publicationYear',
      'pageCount',
      'status',
    ];
    const ok = required.every((key) => {
      const v = data[key];
      return Array.isArray(v) ? v.length > 0 : v !== '';
    });
    setIsFormValid(ok);
  };

  // 2) Handlers
  const handleChange = (e) => {
    const { id, value } = e.target;
    const upd = { ...formData, [id]: value };
    setFormData(upd);
    validateForm(upd);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    const upd = { ...formData, [name]: value };
    setFormData(upd);
    validateForm(upd);
  };

  // 3) Submit with blank→null normalization
  const handleSubmit = async (e) => {
    e.preventDefault();

    // turn semicolon-lists into arrays
    const authors = formData.author.split(';').map((a) => a.trim());
    const genres  = formData.genres.split(';').map((g) => g.trim());

    const payload = {
      title:           formData.title,
      series:          formData.series.trim() || null,
      author:          authors,
      genres:          genres,
      publicationYear: Number(formData.publicationYear),
      pageCount:       Number(formData.pageCount),
      status:          formData.status,
      format:          formData.format || null,
      isbn10:          formData.isbn10.trim() || null,
      isbn13:          formData.isbn13.trim() || null,
      asin:            formData.asin.trim() || null,
      rating:          formData.rating ? Number(formData.rating) : null,
      ...(formData.dateAdded
         ? { dateAdded: new Date(formData.dateAdded) }
         : {}),
    };

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope:    'read:books write:books'
        },
        prompt: 'consent'
      });
      await addBook(payload, token);

      // reset form & go home
      setFormData({...INITIAL_STATE});
      setIsFormValid(false);
      navigate('/home');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className="display-1 text-center">Add New Book</h1>
      <form className="row g-3 m-3" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Series */}
        <div className="col-md-6">
          <label htmlFor="series" className="form-label">Series:</label>
          <input
            id="series"
            type="text"
            className="form-control"
            value={formData.series}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* Author(s) */}
        <div className="col-12">
          <label htmlFor="author" className="form-label">Author(s):</label>
          <input
            id="author"
            type="text"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            placeholder="Name1; Name2; ..."
            required
          />
        </div>

        {/* ISBNs */}
        <div className="col-md-6">
          <label htmlFor="isbn10" className="form-label">ISBN-10:</label>
          <input
            id="isbn10"
            type="text"
            className="form-control"
            value={formData.isbn10}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="isbn13" className="form-label">ISBN-13:</label>
          <input
            id="isbn13"
            type="text"
            className="form-control"
            value={formData.isbn13}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
                <div className="col-md-6">
          <label htmlFor="asin" className="form-label">ASIN:</label>
          <input
            id="asin"
            type="text"
            className="form-control"
            value={formData.asin}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* Genres */}
        <div className="col-12">
          <label htmlFor="genres" className="form-label">Genre(s):</label>
          <input
            id="genres"
            type="text"
            className="form-control"
            value={formData.genres}
            onChange={handleChange}
            placeholder="Genre1; Genre2; ..."
            required
          />
        </div>

        {/* Year & Pages */}
        <div className="col-md-6">
          <label htmlFor="publicationYear" className="form-label">Publication Year:</label>
          <input
            id="publicationYear"
            type="number"
            className="form-control"
            value={formData.publicationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="pageCount" className="form-label">Page Count:</label>
          <input
            id="pageCount"
            type="number"
            className="form-control"
            value={formData.pageCount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Format */}
        <fieldset className="col-md-6">
          <legend>Format:</legend>
          {['physical','ebook','library'].map((opt) => (
            <div key={opt} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={opt}
                name="format"
                value={opt}
                checked={formData.format === opt}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor={opt}>
                {opt.charAt(0).toUpperCase()+opt.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Status */}
        <fieldset className="col-md-6">
          <legend>Status:</legend>
          {['read','want','currentlyReading','owned'].map((opt) => (
            <div key={opt} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={opt}
                name="status"
                value={opt}
                checked={formData.status === opt}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor={opt}>
                {opt.charAt(0).toUpperCase()+opt.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Rating */}
        <div className="col-md-6">
          <label htmlFor="rating" className="form-label">Rating:</label>
          <input
            id="rating"
            type="number"
            className="form-control"
            value={formData.rating}
            onChange={handleChange}
            placeholder="1–5 (optional)"
          />
        </div>

        {/* Date Added */}
        <div className="col-md-6">
          <label htmlFor="dateAdded" className="form-label">Date Added:</label>
          <input
            id="dateAdded"
            type="date"
            className="form-control"
            value={formData.dateAdded}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="col-12 p-3">
          <button
            type="submit"
            className="btn btn-light w-50"
            disabled={!isFormValid}
          >
            Add Book
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary ms-2 w-25"
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
