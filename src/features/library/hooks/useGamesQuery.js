import { useEffect, useState } from "react";
import { getVideoGames, getVideoGameCounts, deleteVideoGame } from "@/services/gameService";
import { useAuth0 } from "@auth0/auth0-react";

export function useGamesQuery() {
    const { getAccessTokenSilently } = useAuth0();
    const [videoGames, setVideoGames] = useState([]);
    const [videoGameCounts, setVideoGameCounts] = useState({
        played: 0,
        wantToPlay: 0,
        playing: 0,
    });

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getVideoGames(token);
            setVideoGames(Array.isArray(data) ? data : []);
        })();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            const data = await getVideoGameCounts(token);
            setVideoGameCounts({
                played: data.played || 0,
                want: data.wantToPlay || 0,
                playing: data.playing || 0,
            });
        })();
    }, [getAccessTokenSilently]);

    const deleteVideoGameById = async (videoGame) => {
        const ok = window.confirm(`Delete "${videoGame.title}"? This can't be undone.`);
        if (!ok) return;

        const token = await getAccessTokenSilently();
        await deleteVideoGame(videoGame._id, token);

        setVideoGames((prev) => prev.filter((v) => v._id !== videoGame._id));
    };

    return { videoGames, videoGameCounts, deleteVideoGameById };
}