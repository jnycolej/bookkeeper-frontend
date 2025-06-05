import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    //If user is still null, redirect to /login
    if(!user) {
        return <Navigate to="/login" replace />;
    }
    //Otherwise, render the child routes
    return <Outlet />;
};