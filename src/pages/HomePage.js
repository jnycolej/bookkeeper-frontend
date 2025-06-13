// Main homepage

import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Profile from "../components/Profile";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)

const HomePage = () => {
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