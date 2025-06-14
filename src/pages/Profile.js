import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileForm from "../components/ProfileForm";
import api from '../services/api';

const Profile = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  
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
    preferences: {genres = [], authors = [], formats = []} = {},
  } = profile;

  return (
    <div>
      <NavBar />
      <h1 className="display-1">Welcome, {displayName}</h1>
      <p>Email: {email}</p>
      <button onClick={() => {navigate('/profileform')}}>Edit Profile</button>
    </div>
  );
};

export default Profile;
