import React, { useState } from 'react';
import axios from 'axios';
import setBooks from './BookList';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
    //Structure of book data entry
    const [formData, setFormData] = useState({
        title: '',
        author: '', // Keep as string during editing
        genres: '', // Keep as string during editing
        publication_year: '',
        page_count: '',
        status: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;

        // Update the field as plain text
        setFormData({ ...formData, [id]: value });

        // Validate the form
        validateForm({ ...formData, [id]: value });
    };

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, status: value });

        // Validate the form
        validateForm({ ...formData, status: value });
    };

    // Validate form completeness
    const validateForm = (data) => {
        const allFieldsFilled = Object.values(data).every(
            (field) => (Array.isArray(field) ? field.length > 0 : field !== '')
        );
        setIsFormValid(allFieldsFilled);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Transform author and genres into arrays during submission
        const submissionData = {
            ...formData,
            author: formData.author.split(';').map((a) => a.trim()), // Split by semicolon and trim spaces
            genres: formData.genres.split(';').map((g) => g.trim()), // Split by semicolon and trim spaces
        };

        // Post the data to the backend
        axios
            .post(`${process.env.REACT_APP_API_URL}/books`, submissionData)
            .then((response) => {
                console.log('Book added successfully:', response.data);

                // Reset form fields after submission
                setFormData({
                    title: '',
                    author: '',
                    genres: '',
                    publication_year: '',
                    page_count: '',
                    status: '',
                });
                setIsFormValid(false);

                //Goes back to homepage
                navigate('/');
            })
            .catch((error) => console.error('Error adding book:', error));
    };

    return (
        //The form
        <div>
            <h1 className="display-1">Add Book</h1>
            <form className="row g-3 m-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Book Title"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="author" className="form-label">
                        Author(s):
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={formData.author} // Store as string during editing
                        onChange={handleChange}
                        placeholder="Author1; Author2; ..."
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label" htmlFor="genres">
                        Genre(s):
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="genres"
                        value={formData.genres} // Store as string during editing
                        onChange={handleChange}
                        placeholder="Genre1; Genre2; ..."
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="publication_year">
                        Publication Year:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="publication_year"
                        value={formData.publication_year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="page_count">
                        Page Count:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="page_count"
                        value={formData.page_count}
                        onChange={handleChange}
                        required
                    />
                </div>
                <fieldset className="row col-12">
                    <legend>Status:</legend>
                    <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="read"
                                name="status"
                                value="read"
                                checked={formData.status === 'read'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="read">
                                Read
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="want_to_read"
                                name="status"
                                value="want_to_read"
                                checked={formData.status === 'want_to_read'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="want_to_read">
                                Want To Read
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="currently_reading"
                                name="status"
                                value="currently_reading"
                                checked={formData.status === 'currently_reading'}
                                onChange={handleRadioChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="currentlyReading"
                            >
                                Currently Reading
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isFormValid}
                    >
                        Add Book
                    </button>
                    <button className='btn btn-lg btn-outline-secondary' onClick={() => navigate('/')}>Return</button>                

                </div>
            </form>
        </div>
    );
};

export default BookForm;
