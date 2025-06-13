import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

    const navigate = useNavigate();

  // 1. Hook is called unconditionally
  useEffect(() => {
    // 2. Guard *inside* the effect
    if (!isAuthenticated) return;

    const fetchMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { user_metadata } = await res.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.error("Failed to load user metadata:", e);
      }
    };

    fetchMetadata();
  }, [isAuthenticated, getAccessTokenSilently, user?.sub]);

  // 3. Now it’s safe to bail out during render
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>
            Please log in to view your profile.
            <button onClick={() => {navigate('/')}}>Login</button>
        </div>;
  }

  // 4. Final render
  return (
    <div>
        <NavBar />
      <h1 className="display-1">My Profile</h1>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  );
};

export default Profile;
