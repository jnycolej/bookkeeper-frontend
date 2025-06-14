import React, { useState } from 'react';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import {addBook} from '../services/bookService';
import axios from 'axios';
import setBooks from './BookList';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import NavBar from './NavBar';

const BookForm = () => {

    const { getAccessTokenSilently } = useAuth0();

    //Structure of book data entry
    const [formData, setFormData] = useState({
        title: '',
        series: '',
        author: '', // Keep as string during editing
        genres: '', // Keep as string during editing
        publicationYear: '',
        pageCount: '',
        status: '',
        format: '',
        rating: '',
        dateAdded: '',
        dateFinished: '',
        isbn10: '',
        isbn13: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        const updated = {...formData, [id]: value};

        // Validate the form
        setFormData(updated);
        validateForm(updated);
    };

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { value } = e.target;
        const updated = {...formData, status: value};
        setFormData(updated);
        validateForm(updated);
    };

    // Validate form completeness
    const validateForm = (data) => {
        const requiredFields = [
            'title',
            'author',
            'genres',
            'publicationYear',
            'pageCount',
            'status',
            'dateAdded'
        ];

        if (data.status === 'read') {
            requiredFields.push('dateFinished');
        }

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Transform author and genres into arrays during submission
        const commonData = {
            ...formData,
            author: formData.author.split(';').map((a) => a.trim()), // Split by semicolon and trim spaces
            genres: formData.genres.split(';').map((g) => g.trim()), // Split by semicolon and trim spaces
        };

        let submissionData = { ...commonData};
        if (formData.status === 'read') {
            submissionData.dateFinished = formData.dateFinished;
            console.log('Read Date:', formData.dateFinished);
        }

        try {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                    scope: 'read:books write:books'
                },
                prompt: 'consent'
            });
            await addBook(submissionData, token);
            // Reset form fields after submission
            setFormData({
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
                dateFinished: '',
                isbn10: '',
                isbn13: '',    
            });
            setIsFormValid(false);
            navigate('/home');
        } catch (err) {
            console.error('Error adding book:', err);
        }
    };

    return (
        //The form
        <div>
            <NavBar />
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
                <div className="col-12">
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
                <div className='col-md-6'>
                    <label htmlFor='isbn10' className='form-label'>ISBN-10:</label>
                    <input 
                        type="text"
                        className='form-control'
                        id="isbn10"
                        value={formData.isbn10}
                        onChange={handleChange}
                        placeholder='ISBN 10 number'
                    />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='isbn13' className='form-label'>ISBN-13:</label>
                    <input 
                        type="text"
                        className='form-control'
                        id="isbn13"
                        value={formData.isbn13}
                        onChange={handleChange}
                        placeholder='ISBN 13 number'
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
                <fieldset className='col-md-6'>
                    <legend>Format:</legend>
                    <div className='col-sm-10'>
                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio'
                                id='physical'
                                name='format'
                                value='physical'
                                checked={formData.format === 'physical'}
                                onChange={handleRadioChange}
                            />
                            <label className='form-check-label' htmlFor='physical'>
                                Physical
                            </label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio'
                                id='ebook'
                                name='format'
                                value='ebook'
                                checked={formData.format === 'ebook'}
                                onChange={handleRadioChange}
                            />
                            <label className='form-check-label' htmlFor='ebook'>
                                E-book
                            </label>
                        </div>
                        <div className='form-check-label form-check-inline'>
                            <input
                                className='form-check-input'
                                type='radio'
                                id='library'
                                name='format'
                                value='library'
                                checked={formData.format === 'library'}
                                onChange={handleRadioChange}
                            />
                            <label className='form-check-label form-check-inline'>
                                Library
                            </label>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="col-md-6">
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
                                id="want"
                                name="status"
                                value="want"
                                checked={formData.status === 'want'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="want">
                                Want
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="currentlyReading"
                                name="status"
                                value="currentlyReading"
                                checked={formData.status === 'currentlyReading'}
                                onChange={handleRadioChange}
                            />
                            <label className="form-check-label" htmlFor="currentlyReading">Currently Reading</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input 
                                className='form-check-input'
                                type='radio'
                                id='owned'
                                name='status'
                                value='owned'
                                checked={formData.status === 'owned'}
                                onChange={handleRadioChange}
                            />
                            <label className='form-check-label' htmlFor='owned'>Owned</label>
                        </div>
                    </div>
                </fieldset>
                { formData.status === 'read' && (
                    <div className='col-md-6'>
                        <label htmlFor='dateFinished' className='form-label'>Read Date:</label>
                        <input 
                            type="date"
                            className='form-control'
                            id='dateFinished'
                            value={formData.dateFinished}
                            onChange={handleChange}
                        />
                    </div>
                )
                }
                <div className="col-md-6">
                    <label className="form-label" htmlFor="rating">
                        Rating:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder='1 (lowest) - 5 (highest)'
                    />
                </div>
                <div className='col-md-6'>
                    <label className='form-label' htmlFor='dateAdded'>
                        Date Added:
                    </label>
                    <input
                        type="date"
                        className='form-control'
                        id='dateAdded'
                        value={formData.dateAdded}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Add Book</button>
                    <button className='btn btn-lg btn-outline-secondary' onClick={() => navigate('/home')}>Return</button>                
                </div>
            </form>
        </div>
    );
};

export default BookForm;
