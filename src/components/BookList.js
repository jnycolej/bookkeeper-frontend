//Component to display the list of books

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import GenreFilter from './GenreFilter';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import NavBar from './NavBar';
import api from '../services/api';
import  { getBooks } from '../services/bookService';
import '../assets/bookkeeper.css';



const BookList = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [books, setBooks] = useState([]);     //Keeps track of books
    const [filteredBooks, setFilteredBooks] = useState([]);     //tracks the list of books after filtering
    const [searchQuery, setSearchQuery] = useState('');     //holds the search
    const [selectedGenres, setSelectedGenres] = useState([]);   //tracks the genres selected in the filtering
    
    //tracks the books read
    const [bookCounts, setBookCounts] = useState({
        read: 0,
        unread: 0,
        currentlyReading: 0
    });

    const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      // 1) fetch the JWT
      const token = await getAccessTokenSilently();
      // 2) hand it to your service
      const data  = await getBooks(token);
      setBooks(data);
    };
    fetchBooks();
  }, [getAccessTokenSilently]);


    const handleSort = (sortType) => {
        let sortedBooks;
        switch (sortType) {
            case 'author-asc':
                sortedBooks = [...filteredBooks].sort((a, b) => a.author[0].localeCompare(b.author[0]));
                break;
            case 'author-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.author[0].localeCompare(a.author[0]));
                break;
            case 'title-asc':
                sortedBooks = [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'year-asc':
                sortedBooks = [...filteredBooks].sort((a, b) => a.publicationYear - b.publicationYear);
                break;
            case 'year-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.publicationYear - a.publicationYear);
                break;
            case 'page-asc':
                sortedBooks = [...filteredBooks].sort((a, b) => a.pageCount - b.pageCount);
                break;
            case 'page-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.pageCount - a.pageCount);
                break;
            default:
                sortedBooks = filteredBooks;
        }
        setFilteredBooks(sortedBooks);
    }

    const handleFilter = (selectedGenres) => {
        if (selectedGenres.length === 0) {
            // If no genres are selected, show all books
            setFilteredBooks(books);
        } else {
            // Filter books to include only those that have all selected genres
            const filtered = books.filter((book) =>
                selectedGenres.every((selectedGenre) =>
                    book.genres.includes(selectedGenre)
                )
            );
            setFilteredBooks(filtered);
            setSelectedGenres(selectedGenres);
        }
    };
    
// Function to highlight search matches
const highlightText = (text, query) => {
    if(!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
};

// useEffect to filter books whenever searchQuery or selectedGenres change
useEffect(() => {
    let filtered = books;

    // Filter by genres if any are selected
    if (selectedGenres.length > 0) {
        filtered = filtered.filter((book) =>
            Array.isArray(book.genres) &&
            selectedGenres.every((selectedGenre) =>
                book.genres.some((bookGenre) =>
                    bookGenre.toLowerCase() === selectedGenre.toLowerCase()
                )
            )
        );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = filtered.filter((book) =>
            book.title.toLowerCase().includes(lowerCaseQuery) ||
            book.author.some((author) =>
                author.toLowerCase().includes(lowerCaseQuery)
            )
        );
    }

    setFilteredBooks(filtered);
}, [books, selectedGenres, searchQuery]);

useEffect(() => {
  const fetchCounts = async () => {
    try {
      const token = await getAccessTokenSilently();
      const { data } = await api.get('/count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookCounts(data);
    } catch (err) {
      console.error('Error fetching book counts:', err);
    }
  };
  fetchCounts();
}, [getAccessTokenSilently]);


    return (
        <div className='m-3 bodycolor'>
            <h1 className='display-1 text-center'>BookKeeper</h1>
            <NavBar />
            <h3 className='display-6 mb-3'>My Reading List</h3>
            <div className='d-flex flex-wrap align-items-center gap-3'>
                <button type="button" className="btn btn-lg btn-outline-secondary common-height" onClick={() => navigate('/bookform')}>Add Book</button>
                <SortButton handleSort={handleSort} />
                <GenreFilter handleFilter={handleFilter} />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </div>
            <div>
                <h4>Status Summary</h4>
                <ul>
                    <li>Read: {bookCounts.read}</li>
                    <li>Unread: {bookCounts.unread}</li>
                    <li>Currently Reading: {bookCounts.currently_reading}</li>
                </ul>
            </div>
            <div className='table-responsive mt-5' style={{ maxHeight: '500px', overflow: 'auto'}}>
                <table className="table table-dark table-striped">
                    <thead className='table-secondary'>
                        <tr>
                            <th>Title</th>
                            <th>Series</th>
                            <th>Author</th>
                            <th>Genres</th>
                            <th>Year</th>
                            <th>Page Count</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <tr
                                    key={book._id}
                                    onClick={() => navigate(`/book/${book._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td dangerouslySetInnerHTML={{ __html: highlightText(book.title, searchQuery) }}></td>
                                    <td>{book.series}</td>
                                    <td dangerouslySetInnerHTML={{ __html: highlightText(book.author.join(', '), searchQuery) }}></td>
                                    <td className='text-capitalize'>{book.genres.join(', ')}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>{book.pageCount}</td>
                                    <td className='text-capitalize'>{book.status}</td>
                                </tr>
                            )
                        )
                        ) : (
                            <tr>
                                <td colSpan="6">No books match the search criteria.</td>
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        Total
                    </tfoot> */}
                </table>                
            </div>
        </div>
    );
};

export default BookList;