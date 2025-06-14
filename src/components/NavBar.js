import React, {useContext} from "react";
//import {AuthContext} from '../AuthProvider';
import { useAuth0} from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Profile from "../pages/Profile";
import { Navigate, useNavigate } from "react-router";
import api from '../services/api';


export default function NavBar() {
    const LogoutButton = () => {
        const { logout } = useAuth0()

        return (
            <button className="btn btn-outline-secondary" onClick={() => logout({ logoutParams: {returnTo: window.location.origin}})}>
                Log Out
            </button>
        );
    };
    const navigate = useNavigate();
    return (
        <nav className="">
            <button onClick={() => navigate('/home')} className="btn btn-primary">Home</button>
            <LoginButton/>
            <LogoutButton />
            <button className="btn btn-primary" onClick={() => navigate('/profile')}>Profile</button>
        </nav>
    );
}