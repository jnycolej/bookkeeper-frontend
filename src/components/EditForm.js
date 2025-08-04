import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';
import NavBar from '../components/NavBar';

export default function EditForm() {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
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
    kindleUnlimited: false,
    libby: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // helper to format ISO → YYYY-MM-DD
  const toInputDate = iso => {
    if (!iso) return '';
    return new Date(iso).toISOString().slice(0, 10);
  };

  // 1) Load existing book & initialize form
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get(`/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEditData({
          title:           data.title,
          series:          data.series || '',
          author:          (data.author || []).join('; '),
          genres:          (data.genres || []).join('; '),
          publicationYear: data.publicationYear || '',
          pageCount:       data.pageCount || '',
          status:          data.status || 'want',
          format:          data.format || '',
          rating:          data.rating || '',
          isbn10:          data.isbn10 || '',
          isbn13:          data.isbn13 || '',
          asin:            data.asin || '',
          kindleUnlimited: data.kindleUnlimited,
          libby:           data.libby,
          dateAdded:       toInputDate(data.dateAdded),
        });

        // Pre-validate so Save is enabled if everything is already present
        validateForm({
          title:           data.title,
          author:          (data.author || []).join('; '),
          genres:          (data.genres || []).join('; '),
          publicationYear: data.publicationYear,
          pageCount:       data.pageCount,
          status:          data.status,
        });
      } catch (e) {
        console.error(e);
        setError('Failed to load book');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getAccessTokenSilently]);

  // 2) Validation: always returns true/false
  const validateForm = data => {
    const required = [
      'title','author','genres','publicationYear','pageCount','status'
    ];
    const ok = required.every(key => {
      const v = data[key];
      return Array.isArray(v)
        ? v.length > 0
        : v !== '';
    });
    setIsFormValid(ok);
  };

  // 3) Handlers
  const handleChange = e => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked: value;
    const upd = { ...editData, [id]: val };
    setEditData(upd);
    validateForm(upd);
  };
  const handleRadioChange = e => {
    const { name, value } = e.target;
    const upd = { ...editData, [name]: value };
    setEditData(upd);
    validateForm(upd);
  };

  // 4) Submit: normalize blanks → null
  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      title:           editData.title,
      series:          editData.series.trim() || null,
      author:          editData.author.split(';').map(a=>a.trim()),
      genres:          editData.genres.split(';').map(g=>g.trim()),
      publicationYear: Number(editData.publicationYear),
      pageCount:       Number(editData.pageCount),
      status:          editData.status,
      format:          editData.format || null,
      isbn10:          editData.isbn10.trim() || null,
      isbn13:          editData.isbn13.trim() || null,
      asin:            editData.asin.trim() || null,
      kindleUnlimited:  editData.kindleUnlimited,
      libby:            editData.libby,
      rating:          editData.rating ? Number(editData.rating) : null,
      ...(editData.dateAdded
         ? { dateAdded: new Date(editData.dateAdded) }
         : {}),
    };

    try {
      const token = await getAccessTokenSilently();
      await api.put(`/books/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/books/${id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update book');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading…</div>;
  if (error)   return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div>
      <NavBar />
      <h1 className="display-1 text-center">Edit Book</h1>
      <form className="row g-3 m-3" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={editData.title}
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
            value={editData.series}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>

        {/* Author(s) */}
        <div className="col-md-6">
          <label htmlFor="author" className="form-label">Author(s):</label>
          <input
            id="author"
            type="text"
            className="form-control"
            value={editData.author}
            onChange={handleChange}
            placeholder="Name1; Name2; ..."
            required
          />
        </div>

        {/* ISBNs */}
        <div className="col-md-3">
          <label htmlFor="isbn10" className="form-label">ISBN-10:</label>
          <input
            id="isbn10"
            type="text"
            className="form-control"
            value={editData.isbn10}
            onChange={handleChange}
            placeholder="(optional)"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="isbn13" className="form-label">ISBN-13:</label>
          <input
            id="isbn13"
            type="text"
            className="form-control"
            value={editData.isbn13}
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
            value={editData.asin}
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
            value={editData.genres}
            onChange={handleChange}
            placeholder="Genre1; Genre2; ..."
            required
          />
        </div>

        {/* Publication Year & Page Count */}
        <div className="col-md-6">
          <label htmlFor="publicationYear" className="form-label">Publication Year:</label>
          <input
            id="publicationYear"
            type="number"
            className="form-control"
            value={editData.publicationYear}
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
            value={editData.pageCount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Format */}
        <fieldset className="col-md-6">
          <legend>Format:</legend>
          {['physical','ebook','library'].map(opt => (
            <div key={opt} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={opt}
                name="format"
                value={opt}
                checked={editData.format === opt}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Status */}
        <fieldset className="col-md-6">
          <legend>Status:</legend>
          {['read','want','currentlyReading','owned'].map(opt => (
            <div key={opt} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={opt}
                name="status"
                value={opt}
                checked={editData.status === opt}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Kindle Unlimited */}
        <div className='col-md-6'>
          <input 
            type="checkbox" 
            name="kindleUnlimited"
            id="kindleUnlimited"
            checked={editData.kindleUnlimited}
            onChange={handleChange}
            className='form-check-input'
          />
          <label className='form-check-label' htmlFor='kindleUnlimited'>
            Kindle Unlimited
          </label>          
        </div>

        {/* Libby */}
        <div className='col-md-6'>
          <input 
            type="checkbox"
            name="libby"
            id="libby"
            checked={editData.libby}
            onChange={handleChange}
            className='form-check-input'
          />
          <label className='form-check-label' htmlFor='libby'>
            Libby
          </label>
        </div>

        {/* Rating */}
        <div className="col-md-6">
          <label htmlFor="rating" className="form-label">Rating:</label>
          <input
            id="rating"
            type="number"
            className="form-control"
            value={editData.rating}
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
            value={editData.dateAdded}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={() => navigate(`/books/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
