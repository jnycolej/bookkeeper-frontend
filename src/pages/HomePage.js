// Main homepage
import React, {useState, useEffect} from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Profile from "./Profile";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)

const HomePage = () => {
    //     useEffect(() => {
    //     if (!isAuthenticated) return;
    //     const fetchProfile = async () => {
    //         try {
    //             const token = await getAccessTokenSilently();
    //             const res = await api.get('/users/me', {
    //                 headers: {Authorization: `Bearer ${token}`}
    //             });
    //             setProfile(res.data);
    //         } catch (e) {
    //             console.error('Failed to fetch profile:', e);
    //         }
    //     };
    //     fetchProfile();
    // }, [isAuthenticated, getAccessTokenSilently]);
    return (
        <div>
            <BookList />
        </div>
    )
}

// export default HomePage;
export default withAuthenticationRequired(HomePage, {
    onRedirecting: () => <div>Loading...</div>
})