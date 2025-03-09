// Main homepage

import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (optional)

const HomePage = () => {
    return (
        <div>
            <BookList />
            {/* <BookForm />             */}
        </div>
    )
}

export default HomePage;