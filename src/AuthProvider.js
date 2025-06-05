import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';

export const AuthContext = createContext({ user: null, setUser: () => {}});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    //On mount, check if a token exists and, if so, fetch /auth/me
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            //Set default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            //Call /auth/me
            axios.get('/auth/me')
                .then(res => {
                    setUser(res.data);  //{id, username, displayName}
                })
                .catch(() => {
                    //Token might be invalid or expired; remove it
                    localStorage.removeItem('jwtToken');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};