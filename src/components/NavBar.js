import React, {useContext} from "react";
//import {AuthContext} from '../AuthProvider';
import { useAuth0} from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Profile from "../pages/Profile";
import { Navigate, useNavigate } from "react-router";
import api from '../services/api';
import BookKeeperLogo from '../assets/BookKeeperLogo.png';

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
        <div>
            <nav className="d-flex flex-wrap gap-3">
                <a href="/home"><img className="logo w-100" src={BookKeeperLogo}/></a>
                <button onClick={() => navigate('/home')} className="btn btn-primary">Home</button>
                <LoginButton/>
                <LogoutButton />
                <button type="button" className="btn common-height" onClick={() => navigate('/bookform')}>Add Book</button>
                <button className="btn" onClick={() => navigate('/profile')}>Profile</button>
            </nav>            
        </div>

    );
}