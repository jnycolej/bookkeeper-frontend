import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenreFilter = ({ handleFilter }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    // Fetch unique genres from the database
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/genres`);
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
                setGenres([]);
            }
        };
        fetchGenres();
    }, []);

    // Handle checkbox changes
    const handleCheckboxChange = (genre) => {
        let updatedGenres;
        if (selectedGenres.includes(genre)) {
            updatedGenres = selectedGenres.filter(item => item !== genre);
        } else {
            updatedGenres = [...selectedGenres, genre];
        }
        setSelectedGenres(updatedGenres);
        handleFilter(updatedGenres);
    };

    return (
        <div className='dropdown'>
            <button
                className='btn btn-lg btn-secondary dropdown-toggle'
                type='button'
                id='genreDropdown'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                >Genre Filter
            </button>
            <div className='dropdown-menu p-3' aria-labelledby='genreDropdown'>
                {genres.map((genre) => (
                    <div className='form-check' key={genre}>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id={`genre-${genre}`}
                            value={genre}
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleCheckboxChange(genre)}
                        />
                        <label className='form-check-label text-capitalize' htmlFor={`genre-${genre}`}>
                            {genre}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreFilter;