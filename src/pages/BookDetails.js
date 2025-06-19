// Page to view/edit details of a specific book

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import api from '../services/api';
import NavBar from '../components/NavBar';
import { deleteBook } from '../services/bookService';

const BookDetails = () => {
    const { id } = useParams();

    const { getAccessTokenSilently } = useAuth0();

    const [book, setBook] = useState(null);
    const [bookImage, setBookImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigate();

    const handleDelete = () => {
        
    }
    useEffect(() => {
        //Fetch book details from the backend API
        setLoading(true);
        const fetchBookDetails = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await api.get(
                   `/books/${id}`,
                   { headers: { Authorization: `Bearer ${token}` } }
                 );
                const data = response.data;
                setBook(data);
                setBookImage(
                    `https://covers.openlibrary.org/b/isbn/${data.isbn13 || data.isbn10}-M.jpg`
                )
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, getAccessTokenSilently]);

    if (loading) {
        return <div className='text-center text-danger mt-5'>Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    if (!book) {
        return <div className='text-centeer text-danger mt-5'>Book not found</div>
    }

    return (
        <div className="container mt-5">
            <NavBar />
            <h1 className='display-2'>{book.title}</h1>
            <h3 className='display-6'>{book.series}</h3>
            <button className='btn btn-primary' onClick={() => navigation(`/books/${book._id}/edit`)}>Edit Book</button>
            <p className='lead'>By {
                Array.isArray(book.author)
                    ? book.author.join(', ')
                    : book.author
                }
            </p>
            <hr />
            <div>
                <h4>Genres</h4>
                <p className='text-capitalize'>{Array.isArray(book.genres)
                        ? book.genres.join(' | ')
                        : book.genre
                    }
                </p>
            </div>
            <div>
                <h4>Publication Year</h4>
                <p>{book.publicationYear}</p>
            </div>
            <div>
                <h4>Page Count</h4>
                <p>{book.pageCount}</p>
            </div>
            <div>
                <h4>Status</h4>
                <p className='text-capitalize'>{book.status}</p>
            </div>
            <div>
                <h4>Format</h4>
                <p className='text-capitalize'>{book.format}</p>
            </div>
            <div>
                <h4>Page Count</h4>
                <p>{book.pageCount}</p>
            </div>
            <div className=' d-flex m-2'>
                <button className='btn btn-lg btn-outline-secondary' onClick={() => navigation('/home')}>Return</button>                
            </div>
        </div>
    );
};

// export default BookDetails;
export default withAuthenticationRequired(BookDetails, {
    onRedirecting: () => <div>Loading...</div>
});