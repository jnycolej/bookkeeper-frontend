import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editData, setEditData] = useState({
        title: '',
        series: '',
        author: '', // Keep as string during editing
        genres: '', // Keep as string during editing
        publicationYear: '',
        pageCount: '',
        status: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    //Fetch book etails when the component mounts
    useEffect(() => {
        //Fetch book details from the backend API
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch book details');
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    // Set the form state when book details are fetched
    useEffect(() => {
        if (book) {
            setEditData({
                title: book.title,
                series: book.series,
                author: book.author.join('; '), // Convert array to string for editing
                genres: book.genres.join('; '), // Convert array to string for editing
                publicationYear: book.publicationYear,
                pageCount: book.pageCount,
                status: book.status,
            });
        }
    }, [book]);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        // Update the field as plain text
        setEditData({ ...editData, [id]: value });
        validateForm({ ...editData, [id]: value });
    };

    // Handle radio button changes
    const handleRadioChange = (e) => {
        const { value } = e.target;
        setEditData({ ...editData, status: value });
        validateForm({ ...editData, status: value });
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
            ...editData,
            author: editData.author.split(';').map((a) => a.trim()), // Split by semicolon and trim spaces
            genres: editData.genres.split(';').map((g) => g.trim()), // Split by semicolon and trim spaces
        };

        // Post the data to the backend
        axios
            .put(`${process.env.REACT_APP_API_URL}/books/${id}`, submissionData)
            .then((response) => {
                console.log('Book updated successfully:', response.data);

                //Goes back to homepage
                navigate(`/book/${book._id}`);
            })
            .catch((error) => console.error('Error updating book:', error));
    };

    //Render loading, error, or form based on state
    if (loading) {
        return <div className='text-center mt-5'>Loading...</div>
    }

    if (error) {
        return <div className='text-center text-danger mt-5'>{error}</div>
    }

    return (
        <div>
            <h1 className="display-1">Edit Book</h1>
            <form className="row g-3 m-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        value={editData.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className='col-md-6'>
                    <label className="form-label" htmlFor="series">Series</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="series"
                        value={editData.series}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="author" className="form-label"> Author(s): </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={editData.author} // Store as string during editing
                        onChange={handleChange}
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
                        value={editData.genres} // Store as string during editing
                        onChange={handleChange}
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
                        value={editData.publicationYear}
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
                        value={editData.pageCount}
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
                                checked={editData.status === 'read'}
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
                                checked={editData.status === 'unread'}
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
                                id="currentlyReading"
                                name="status"
                                value="currentlyreading"
                                checked={editData.status === 'currentlyreading'}
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
                        Edit Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;
