import { useEffect, useState } from "react";
import { getTVShows, getTVShowCounts, deleteTVShow } from "@/services/tvShowService";
import { useAuth0 } from "@auth0/auth0-react";

export function useTVShowsQuery() {
    const { getAccessTokenSilently } = useAuth0();
    const [tvShows, setTVShows] = useState([]);
    const [tvShowCounts, setTVShowCounts] = useState({
        watched: 0,
        wantToWatch: 0,
        owned: 0,
    });

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getTVShows(token);
            setTVShows(Array.isArray(data) ? data : []);
        })();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getTVShowCounts(token);
            setTVShowCounts({
                watched: data.watched || 0,
                wantToWatch: data.wantToWatch || 0,
                watching: data.watching || 0,
            });
        })();
    }, [getAccessTokenSilently]);

    const deleteTvShowById = async (tvShow) => {
        const ok = window.confirm(`Delete "${tvShow.title}"? This can't be undone.`);
        if (!ok) return;

        const token = await getAccessTokenSilently();
        await deleteTVShow(tvShow._id, token);

        setTVShows((prev) => prev.filter((s) => s._id !== tvShow._id));
    };

    return { tvShows, tvShowCounts, deleteTvShowById };
}