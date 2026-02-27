import { useEffect, useState } from "react";
import { getMovies, getMovieCounts, deleteMovie } from "@/services/movieService";
import { useAuth0 } from "@auth0/auth0-react";

export function useMoviesQuery() {
    const { getAccessTokenSilently } = useAuth0();
    const [movies, setMovies] = useState([]);
    const [movieCounts, setMovieCounts] = useState({
        watched: 0,
        wantToWatch: 0,
        watching: 0,
        owned: 0,
        rewatching: 0,
    });

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getMovies(token);
            setMovies(Array.isArray(data) ? data : []);
        })();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getMovieCounts(token);
            setMovieCounts({
                watched: data.watched || 0,
                wantToWatch: data.wantToWatch || 0,
                owned: data.owned || 0,
                watching: data.watching || 0,
                rewatching: data.rewatching || 0,
            });
        })();
    }, [getAccessTokenSilently]);

    const deleteMovieById = async (movie) => {
        const ok = window.confirm(`Delete "${movie.title}"? This can't be undone.`);
        if (!ok) return;

        const token = await getAccessTokenSilently();
        await deleteMovie(movie._id, token);

        setMovies((prev) => prev.filter((m) => m._id !== movie._id));
    };

    return { movies, movieCounts, deleteMovieById };
}