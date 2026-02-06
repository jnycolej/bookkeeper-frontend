import { useEffect, useState } from "react";
import { getBooks, getBookCounts, deleteBook } from "@/services/bookService";
import { getMovies } from "@/services/movieService";
import { useAuth0 } from "@auth0/auth0-react";

export function useBooksQuery() {
    const { getAccessTokenSilently } = useAuth0();
    const [books, setBooks] = useState([]);
    const [bookCounts, setCounts] = useState({
        read: 0,
        currentlyReading: 0,
        want: 0,
        owned: 0,
    });

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getBooks(token);
            setBooks(Array.isArray(data) ? data : []);
        })();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getBookCounts(token);
            setCounts({
                read: data.read || 0,
                currentlyReading: data.currentlyReading || 0,
                want: data.want || 0,
                owned: data.owned || 0,
            });
        })();
    }, [getAccessTokenSilently]);

    const deleteById = async (book) => {
        const ok = window.confirm(`Delete "${book.title}"? This can't be undone.`);
        if (!ok) return;

        const token = await getAccessTokenSilently();
        await deleteBook(book._id, token);

        setBooks((prev) => prev.filter((b) => b._id !== book._id));
    };

    return { books, bookCounts, deleteById };
}