import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const [errorMsg, setErrorMsg] = useState('');

    const { setUser } = useContext(AuthContext);


    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const res = await axios.post('/auth/login', {
                username: formData.username,
                password: formData.password
            });
            const token = res.data.token;
            
            
            localStorage.setItem('jwtToken', token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const profileRes = await axios.get('/auth/me');
            setUser(profileRes.data);

            navigate('/');
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            alert("Login failed: Please enter the correct username and password or register for new users.");
        }
    };

    return (
        <div className='container mt-5' style={{maxWidth: '400px'}}>
            <h1>BookKeeper</h1>
            <h3>Login</h3>

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

                <button type="submit" className='btn btn-primary w-50'>Login</button>
                <button type="button" className='btn btn-secondary w-50' onClick={() => navigate('/register')}>Register</button>
            </form>
        </div>
    )
}

export default LoginPage;