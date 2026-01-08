//Component for searching books

import React, { useMemo } from 'react';
import { debounce } from 'lodash';
import api from '../services/api';


const SearchBar = ({searchQuery, setSearchQuery}) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const debouncedHandleInputChange = useMemo(() => debounce(handleInputChange, 300), []);
    return (
        <div className='d-flex align-items-center'>
            <label htmlFor="search" className="form-label fw-bold fs-5 me-2 mb-0">Search:</label>
            <input 
                type="text" 
                className="form-control" 
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
                style={{ maxWidth: '300px', width: '100%'}}
            />
        </div>
    )
}

export default SearchBar;