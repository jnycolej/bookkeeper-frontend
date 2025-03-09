// Root component

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetails from './pages/BookDetails';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import EditForm from './components/EditForm';

// Create a router using createBrowserRouter and set up the routes to pages and components
const router = createBrowserRouter(
    [
        { path: "/", element: <HomePage />, },
        { path: "/books", element: <BookList />, },
        { path: "/bookform", element: <BookForm />, },
        { path: "/book/:id", element: <BookDetails />, },
        { path: "/book/:id/edit", element: <EditForm />,},
    ], 
    {
        future: {
            v7_startTransition: true, // Opt-in for React v7 startTransition behavior
            v7_relativeSplatPath: true, // Opt-in for the new relative route resolution behavior for splat routes
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

// Use RouterProvider to provide the router configuration to the app
const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
