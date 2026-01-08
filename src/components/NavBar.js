import React, {useContext} from "react";
//import {AuthContext} from '../AuthProvider';
import { useAuth0} from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import { Navigate, useNavigate } from "react-router";
import BookKeeperLogo from '../assets/BookKeeperLogo.png';

export default function NavBar() {
    const LogoutButton = () => {
        const { logout } = useAuth0()

        return (
            <button className="btn" onClick={() => logout({ logoutParams: {returnTo: window.location.origin}})}>
                Log Out
            </button>
        );
    };
    const navigate = useNavigate();
    return (
        <div>
            <nav className=" navbar navbar-expand-sm align-content-center d-flex flex-wrap gap-2">
                <div className="container">
                    <a className="navbar-brand" href="/home"><img className="logo w-100" src={BookKeeperLogo}/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navMenu" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/books">Library</a></li>
                            <li className="nav-iten"><a className="nav-link" href="/bookform">Add Book</a></li>
                            <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>
                        </ul>
                        <LoginButton/>
                        <LogoutButton />                      
                    </div>   
                
                </div>
            </nav>            
        </div>

    );
}