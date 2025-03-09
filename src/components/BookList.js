//Component to display the list of books

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenreFilter from './GenreFilter';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import '../assets/bookkeeper.css';


const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [bookCounts, setBookCounts] = useState({
        read: 0,
        want_to_read: 0,
        currently_reading: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        //Fetch books from the backend API
        axios
            .get(`${process.env.REACT_APP_API_URL}/books`)
            .then(response => {
                setBooks(response.data);
                setFilteredBooks(response.data);
            })
            .catch(error => console.error("Error fetching books:", error))
    }, []);

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
                sortedBooks = [...filteredBooks].sort((a, b) => a.publication_year - b.publication_year);
                break;
            case 'year-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.publication_year - a.publication_year);
                break;
            case 'page-asc':
                sortedBooks = [...filteredBooks].sort((a, b) => a.page_count - b.page_count);
                break;
            case 'page-desc':
                sortedBooks = [...filteredBooks].sort((a, b) => b.page_count - a.page_count);
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
    axios.get(`${process.env.REACT_APP_API_URL}/books/count`)
        .then(response => {
            setBookCounts(response.data);
        })
        .catch(error => console.error("Error fetching book counts:", error));
}, []);

    return (
        <div className='m-3 bodycolor'>
            <h1 className='display-1 text-center'>BookKeeper</h1>
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
                    <li>Want to Read: {bookCounts.want_to_read}</li>
                    <li>Currently Reading: {bookCounts.currently_reading}</li>
                </ul>
            </div>
            <div className='table-responsive mt-5' style={{ maxHeight: '500px', overflow: 'auto'}}>
                <table className="table table-dark table-striped">
                    <thead className='table-secondary'>
                        <tr>
                            <th>Title</th>
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
                                    <td dangerouslySetInnerHTML={{ __html: highlightText(book.author.join(', '), searchQuery) }}></td>
                                    <td className='text-capitalize'>{book.genres.join(', ')}</td>
                                    <td>{book.publication_year}</td>
                                    <td>{book.page_count}</td>
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
                    <tfoot>
                        Total
                    </tfoot>
                </table>                
            </div>
        </div>
    );
};

export default BookList;