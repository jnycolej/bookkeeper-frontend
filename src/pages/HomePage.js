// Main homepage
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import BookList from "../components/BookList";
import NavBar from "../components/NavBar";
import FeatureBanner from '../components/FeatureBanner';
import BookForm from "../components/BookForm";
import Profile from "./Profile";
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { getBooks } from "../services/bookService";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)
import '../assets/bookkeeper.css';

const HomePage = () => {
    const { getAccessTokenSilently} = useAuth0();

    const [books, setBooks] = useState([]);
    //Get all books
   useEffect(() => {
     const fetchBooks = async () => {
       const token = await getAccessTokenSilently();
       const data  = await getBooks(token);
       setBooks(data);
     };
     fetchBooks();
   }, [getAccessTokenSilently]);
    return (
        <body>
            <NavBar />
            <div>
                <FeatureBanner />
            </div>
            <div className="list-body">
            <BookList
                books={books}
                onRowClick={id => navigate(`/books/${id}`)}
            />                
            </div>

        </body>
    )
}

export default withAuthenticationRequired(HomePage, {
    onRedirecting: () => <div>Loading...</div>
})