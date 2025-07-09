import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {getBookCounts, getBooks} from '../services/bookService';

const FeatureBanner = () => {
    const { getAccessTokenSilently} = useAuth0();
    const [books, setBooks] = useState([]);
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [bookImage, setBookImage] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = await getAccessTokenSilently();
            const data = await getBooks(token);

            const withCovers = data.map(book => {
                const coverUrl = book.asin
                    ? `https://images.amazon.com/images/P/${book.asin}.jpg`
                    :  `https://covers.openlibrary.org/b/isbn/${book.isbn13 || book.isbn10}-M.jpg`;
                return {...book, coverUrl};
            });
            setBooks(withCovers);
        };
        fetchBooks();
    }, [getAccessTokenSilently]);

  // derive featured subset whenever books load
  useEffect(() => {
    if (!books.length) return;
    const featured = books.filter(b => b.status === 'currentlyReading');
    setFeaturedBooks(featured);
  }, [books]);


    return (
        <div>
            <h1 className="display-5 text-center">Currently Reading</h1>
    <div id="carouselIndicators" className="carousel carousel-dark slide pb-5">
      <div className="carousel-indicators">
        {featuredBooks.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carouselIndicators"
            data-bs-slide-to={idx}
            className={idx === 0 ? 'active' : undefined}
            aria-current={idx === 0 ? 'true' : undefined}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {featuredBooks.map((book, idx) => (
          <div
            key={book._id}
            className={`carousel-item${idx === 0 ? ' active' : ''}`}
          >
            <img
              src={book.coverUrl}
              className="d-block mx-auto"
              alt={book.title}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>            
        </div>

    );
};

export default FeatureBanner;