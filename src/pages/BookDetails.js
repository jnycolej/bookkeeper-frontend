// Page to view/edit details of a specific book

import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [bookImage, setBookImage] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        //Fetch book details from the backend API
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`api/books/${id}`);
                setBook(response.data);
                setLoading(false);

                const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn13 || book.isbn10}-M.jpg`;
                setBookImage(coverUrl);
            } catch (err) {
                setError('Failed to fetch book details');
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

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
            <img src={bookImage} alt="Book Cover" width="500" height="600"></img>
            <h1 className='display-4'>{book.title}</h1>
            <p className='lead'>By {book.author.join(', ')}</p>
            <hr />
            <div>
                <h4>Genres</h4>
                <p>{book.genres.join(', ')}</p>
            </div>
            <div>
                <h4>Publication Year</h4>
                <p>{book.publication_year}</p>
            </div>
            <div>
                <h4>Page Count</h4>
                <p>{book.page_count}</p>
            </div>
            <div>
                <h4>Status</h4>
                <p>{book.status}</p>
            </div>
            <div className=' d-flex m-2'>
                <button className='btn btn-lg btn-primary' onClick={() => navigation(`/book/${book._id}/edit`)}>Edit Book</button>
                <button className='btn btn-lg btn-outline-secondary' onClick={() => navigation('/home')}>Return</button>                
            </div>

        </div>
    );
};

// export default BookDetails;
export default withAuthenticationRequired(BookDetails, {
    onRedirecting: () => <div>Loading...</div>
});