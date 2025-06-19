import React, {useEffect, useState} from "react";
import api from '../services/api';
import { useAuth0 } from '@auth0/auth0-react';

const StatusFilter = ({ handleFilter }) => {
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const {getAccessTokenSilently} = useAuth0();

    const handleCheckBoxChange = (status) => {
        let updatedStatuses;
        if (selectedStatus.includes(status)) {
            updatedStatuses = selectedStatus.filter(item => item !== genre);
        } else {
            updatedStatuses = [...selectedStatus, status];
        }
        setSelectedStatus(updatedStatuses);
        handleFilter(updatedStatuses);
    }

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
            </div>
        </div>
    );
};

export default StatusFilter;