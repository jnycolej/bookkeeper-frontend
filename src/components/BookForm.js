import React, { useState } from 'react';
import axios from 'axios';
import setBooks from './BookList';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
    //Structure of book data entry
    const [formData, setFormData] = useState({
        title: '',
        series: '',
        author: '', // Keep as string during editing
        genres: '', // Keep as string during editing
        publicationYear: '',
        pageCount: '',
        status: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        const updated = {...formData, [id]: value};
        // // Update the field as plain text
        // setFormData({ ...formData, [id]: value });

        // // Validate the form
        // validateForm({ ...formData, [id]: value });
        setFormData(updated);
        validateForm(updated);
    };

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { value } = e.target;
        const updated = {...formData, status: value};
        setFormData(updated);
        validateForm(updated);
        // setFormData({ ...formData, status: value });

        // // Validate the form
        // validateForm({ ...formData, status: value });
    };

    // Validate form completeness
    const validateForm = (data) => {
        // const allFieldsFilled = Object.values(data).every(
        //     (field) => (Array.isArray(field) ? field.length > 0 : field !== '')
        // );
        // setIsFormValid(allFieldsFilled);
        const requiredFields = [
            'title',
            'author',
            'genres',
            'publicationYear',
            'pageCount',
            'status'
        ];

        const allRequiredFilled = requiredFields.every((key) => {
            const field = data[key];
            if (Array.isArray(field)) {
                return field.length > 0;
            }
            return field !== '';
        });

        setIsFormValid(allRequiredFilled);
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
            // .post(`${process.env.REACT_APP_API_URL}/books`, submissionData)
            .post('/books', submissionData)
            .then((response) => {
                console.log('Book added successfully:', response.data);

                // Reset form fields after submission
                setFormData({
                    title: '',
                    series: '',
                    author: '',
                    genres: '',
                    publicationYear: '',
                    pageCount: '',
                    status: '',
                });
                setIsFormValid(false);

                //Goes back to homepage
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error adding book:', error);
            });
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
                    <label htmlFor="series" className="form-label">Series:</label>
                    <input
                        type="text"
                        className='form-control'
                        id="series"
                        value={formData.series}
                        onChange={handleChange}
                        placeholder='Series Name (If N/A leave blank)'
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
                    <label className="form-label" htmlFor="publicationYear">
                        Publication Year:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="publicationYear"
                        value={formData.publicationYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="pageCount">
                        Page Count:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="pageCount"
                        value={formData.pageCount}
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
                                id="unread"
                                name="status"
                                value="unread"
                                checked={formData.status === 'unread'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="unread">
                                Unread
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
                            <label className="form-check-label" htmlFor="currentlyReading">Currently Reading</label>
                        </div>
                    </div>
                </fieldset>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Add Book</button>
                    <button className='btn btn-lg btn-outline-secondary' onClick={() => navigate('/home')}>Return</button>                
                </div>
            </form>
        </div>
    );
};

export default BookForm;
