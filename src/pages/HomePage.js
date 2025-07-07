// Main homepage
import React, {useState, useEffect} from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Profile from "./Profile";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)
import '../assets/bookkeeper.css';

const HomePage = () => {
    return (
        <body>
            <BookList />
        </body>
    )
}

export default withAuthenticationRequired(HomePage, {
    onRedirecting: () => <div>Loading...</div>
})