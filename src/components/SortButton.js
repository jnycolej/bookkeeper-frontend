import React from 'react';

const SortButton = ({ handleSort }) => {
    return (
        <div className="dropdown">
            <button 
                className="btn btn-lg w-100 btn-secondary dropdown-toggle" 
                type="button" 
                id="sortDropdown" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Sort
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                    <button className="dropdown-item" onClick={() => handleSort('author-asc')}>Author (A-Z)</button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => handleSort('author-desc')}>Author (Z-A)</button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => handleSort('title-asc')}>Title (A-Z)</button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => handleSort('title-desc')}>Title (Z-A)</button>
                </li>
                <li>
                    <button className='dropdown-item' onClick={() => handleSort('year-asc')}>Year (oldest - newest)</button>
                </li>
                <li>
                    <button className='dropdown-item' onClick={() => handleSort('year-desc')}>Year (newest - oldest)</button>
                </li>
                <li>
                    <button className='dropdown-item' onClick={() => handleSort('page-asc')}>Page Count (ascending)</button>
                </li>
                <li>
                    <button className='dropdown-item' onClick={() => handleSort('page-desc')}> Page Count (descending)</button>
                </li>
            </ul>
        </div>
    );
};

export default SortButton;
