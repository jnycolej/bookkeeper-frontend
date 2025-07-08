import React, {useEffect, useState} from "react";
import api from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';

const StatusFilter = ({ handleFilter }) => {
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const {getAccessTokenSilently} = useAuth0();

const handleCheckBoxChange = (statusValue) => {
  let updated = selectedStatus.includes(statusValue)
    ? selectedStatus.filter(item => item !== statusValue)
    : [...selectedStatus, statusValue];
  setSelectedStatus(updated);
  handleFilter(updated);
};

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type='button'
                id='stausDropdown'
                data-bs-toggle='dropdown'
                aria-expanded='false'
            >Status Filter</button>
            <div className="dropdown-menu scrollable-menu p-3" aria-labelledby="statusDropdown">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type='checkbox'
                        id='status-read'
                        value='read'
                        checked={selectedStatus.includes('read')}
                        onChange={() => handleCheckBoxChange('read')}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="status-read">
                        Read
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type='checkbox'
                        id='status-currentlyReading'
                        value='currentlyReading'
                        checked={selectedStatus.includes('currentlyReading')}
                        onChange={() => handleCheckBoxChange('currentlyReading')}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="status-currentlyReading">
                        Currently Reading
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type='checkbox'
                        id='status-want'
                        value='want'
                        checked={selectedStatus.includes('want')}
                        onChange={() => handleCheckBoxChange('want')}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="status-want">
                        Want
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type='checkbox'
                        id='status-owned'
                        value='owned'
                        checked={selectedStatus.includes('owned')}
                        onChange={() => handleCheckBoxChange('owned')}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="status-owned">
                        Owned
                    </label>
                </div>
                             <div className="form-check">
                    <input
                        className="form-check-input"
                        type='checkbox'
                        id='status-unread'
                        value='unread'
                        checked={selectedStatus.includes('unread')}
                        onChange={() => handleCheckBoxChange('unread')}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="status-unread">
                        Currently Reading
                    </label>
                </div>
            </div>
        </div>
    );
};

export default StatusFilter;