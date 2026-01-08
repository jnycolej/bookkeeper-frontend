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
                if(!data.asin)
                {setBookImage(`https://covers.openlibrary.org/b/isbn/${data.isbn13 || data.isbn10}-M.jpg`
                    )} else {
                        setBookImage(`https://images.amazon.com/images/P/${data.asin}.jpg`)
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [id, getAccessTokenSilently]);

    if (loading) { return <div className='text-center text-danger mt-5'>Loading...</div>; }

    if (error) { return <div className="text-center text-danger mt-5">{error}</div>;}

    if (!book) { return <div className='text-centeer text-danger mt-5'>Book not found</div> }

    return (
        <div className="container mt-5">
            <NavBar />
            <h1 className='display-2'>{book.title}</h1>
            <h3 className='fs-3 fw-lighter fst-italic'>{book.series} {book.seriesNum ? `# ${book.seriesNum}` : ""}</h3>            
            <div className='container text-center'>
                <div className='row align-items-center'>
                    <div className='col'>
                        <p className='lead fw-bold'>{
                            Array.isArray(book.author)
                            ? book.author.join(' | ')
                            : book.author
                        }
                        </p>
                        <hr />
                        <div>
                            <h4>Genres</h4>
                            <p className='text-capitalize font-monospace'>{Array.isArray(book.genres)
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
                <div>
                    <h4>Kindle Unlimited</h4>
                    <p>{book.kindleUnlimited ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <h4>Libby</h4>
                    <p>{book.libby ? 'Yes' : 'No'}</p>
                </div>
                <div className=' btn-group d-flex m-2'>
                    <button className='btn btn-primary' onClick={() => navigation(`/books/${book._id}/edit`)}>Edit Book</button>
                    <button className='btn btn-outline-secondary' onClick={() => navigation('/home')}>Return</button>                
                </div>
            </div>
            <div className='col'>
                <img src={bookImage} alt="Book Cover" width="225" height="350"></img> 
            </div>
        </div>
    </div>
</div>
    );
};

// export default BookDetails;
export default withAuthenticationRequired(BookDetails, {
    onRedirecting: () => <div>Loading...</div>
});