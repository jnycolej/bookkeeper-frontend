import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)

const FilterOptions = ({handleFilter}) => {
    return (
        <div className='d-flex gap-2'>
            <div className='dropdown show'>
            <button 
                className="btn btn-lg w-100 btn-secondary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Genre Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Author A-Z</a>
                <a className="dropdown-item" href="#">Author Z-A</a>
                <a className="dropdown-item" href="#">Title A-Z</a>
                <a className="dropdown-item" href="#">Title Z-A</a>
            </div>                
            </div>

            <div className=" dropdown show">
            <button 
                className="btn btn-lg w-100 btn-secondary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Read Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => handleFilter('read')}>Author A-Z</a>
                <a className="dropdown-item" onClick={() => handleFilter('want_to_read')}>Author Z-A</a>
                <a className="dropdown-item" onClick={() => handleFilter('currently-reading')}>Title A-Z</a>
                <a className="dropdown-item" href="#">Title Z-A</a>
            </div>
        </div>
        </div>
        
    )
}

export default FilterOptions;