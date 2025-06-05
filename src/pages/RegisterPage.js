import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/register', {
                username: formData.username,
                password: formData.password
            });

            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            alert("Registration failed: Please enter a valid username and password. If you already have an account please click the login to login.");

        }
    };

    return (
        <div className='container mt-5' style={{maxWidth: '400px'}}>
            <h1>BookKeeper</h1>
            <h3>Register</h3>

            {errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="username">UserName:</label>
                    <input
                        type="text"
                        className='form-control'
                        id='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="password">Password:</label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-primary w-50'>Register</button>
                <button className='btn btn-secondary w-50' onClick={() => {navigate("/login")}}>Login</button>
                
            </form>
        </div>
    )
}

export default RegisterPage;