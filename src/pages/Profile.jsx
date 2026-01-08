import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import api from '../services/api';
import  { getBookCounts } from '../services/bookService';

const Profile = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [genres, setGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  
  
  const [bookCounts, setBookCounts] = useState({
    read: 0,
    currentlyReading: 0,
    want: 0,
    owned: 0,
  });

  const navigate = useNavigate();

  // 1) Fetch your Mongo user record once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();

    const fetchGenres = async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await api.get('books/genres', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setGenres([]);
      }
    };
    fetchGenres();

    const fetchCounts = async () => {
      try {
        const token = await getAccessTokenSilently();
        const data = await getBookCounts(token);
        console.log('count payload:', data);
    
        setBookCounts({
          read: data.read || 0,
          currentlyReading: data.currentlyReading || 0,
          want: data.want || 0,
          owned: data.owned || 0,
        });
      } catch (err) {
        console.error('Error fetching book counts:', err);
      }
    };
    fetchCounts();

  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading || profile === null) {
    return <div>Loading your profile…</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        Please log in to view your profile.
        <button onClick={() => navigate("/")}>Login</button>
      </div>
    );
  }

  const {
    displayName,
    email,
    // preferences: {genres = [], authors = [], formats = []} = {},
  } = profile;

  return (
    <div>
      <NavBar />
      <h1 className="display-1">Welcome, <span className="text-primary">{displayName}</span></h1>
      <p className="text-primary">Name: {displayName}</p>
      <p className="text-primary">Email: {email}</p>
      <p>Genres:</p>
      <div className="overflow-auto scrollable-list">
        {genres.length > 0 ? (
          genres.map(genre => (
            <ul className="list-group-flush" data-bs-scroll="true" key={genre}>
              <li className="text-capitalize list-group-item">{genre}</li>
            </ul>
          ))
        ) : (
          <p>No genres</p>
        )}         
      </div>
      

      <p>Amount of books read: {bookCounts.read}</p>
      <button className="btn btn-primary" onClick={() => {navigate('/profileform')}}>Edit Profile</button>
    </div>
  );
};

export default Profile;
