import React, {useContext} from "react";
//import {AuthContext} from '../AuthProvider';
import { useAuth0} from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Profile from "./Profile";
import { Navigate, useNavigate } from "react-router";
import api from '../services/api';


export default function NavBar() {
    const LogoutButton = () => {
        const { logout } = useAuth0()

        return (
            <button onClick={() => logout({ logoutParams: {returnTo: window.location.origin}})}>
                Log Out
            </button>
        );
    };
    const navigate = useNavigate();
    return (
        <nav>
            <button onClick={() => navigate('/home')} className="btn btn-primary">Home</button>
            <LoginButton/>
            <LogoutButton />
            <button onClick={() => navigate('/profile')}>Profile</button>
        </nav>
    );
}