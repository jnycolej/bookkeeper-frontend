// Root component
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BookDetails from './pages/BookDetails';
import BookForm from './components/BookForm';
import EditForm from './components/EditForm';
import Profile from './pages/Profile';
import ProfileForm from './components/ProfileForm';
import LibraryPage from './pages/LibraryPage';
import MovieForm from './components/MovieForm';
import MovieDetails from './pages/MovieDetails';
import MovieEditForm from './components/MovieEditForm';

// Create a router using createBrowserRouter and set up the routes to pages and components
const router = createBrowserRouter(
    [
        { path: "/", element: <LoginPage />, },
        { path: "/home", element: <HomePage />},       
        { path: "/library", element: <LibraryPage />},

        //Book Routes
        { path: "/library/books/new", element: <BookForm />, },
        { path: "/library/books/:id", element: <BookDetails />, },
        { path: "/library/books/:id/edit", element: <EditForm />,},

        //Movie Routes
        { path: "/library/movies/new", element: <MovieForm />},
        { path: "/library/movies/:id", element: <MovieDetails />,},
        { path: "/library/movies/:id/edit", element: <MovieEditForm />},

        { path: "/profile", element: <Profile />,},
        { path: "/profileform", element: <ProfileForm />,},
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
