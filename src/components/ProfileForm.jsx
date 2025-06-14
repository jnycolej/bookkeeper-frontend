import React, {useState, useEffect} from "react";
import {useAuth0} from '@auth0/auth0-react';
import api from '../services/api';
import { Navigate, useNavigate } from "react-router";

export default function ProfileForm() {
    const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [profile, setProfile] = useState({ displayName: '', email: ''});
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    //Fetch the existing profile on mount once authenticated
    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await api.get('/users/me', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setProfile(res.data);
            } catch (e) {
                console.error('Failed to fetch profile:', e);
            }
        };
        fetchProfile();
    }, [isAuthenticated, getAccessTokenSilently]);

    //Handle input changes
    const handleChange = e => {
        const { name, value } = e.target;
        setProfile(p => ({ ...p, [name]: value }));
    };

    //Submit the updated profile
    const handleSubmit = async e => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = await getAccessTokenSilently();
            const res = await api.put('/users/me', profile, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setProfile(res.data);
            alert('Profile saved!');
        } catch (e) {
            console.error('Failed to save profile:', e);
            alert('Error saving profile.');
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <div>Loading auth...</div>;
    if (!isAuthenticated) return <div>
        Please login to edit your profile.
        <button onClick={() => {navigate('/')}}>Login</button>
    </div>

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name
                    <input
                        name="displayName"
                        value={profile.displayName}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label> Email
                    <input
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
            </button>
        </form>
    );
}