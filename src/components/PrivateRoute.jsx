// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // 1) Show a loading state while Auth0 is initializing
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 2) If not logged in, send them back to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 3) Otherwise render the protected component
  return children;
}
