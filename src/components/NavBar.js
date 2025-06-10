import React, {useContext} from "react";
//import {AuthContext} from '../AuthProvider';
import { useAuth0} from '@auth0/auth0-react';
import LoginButton from './LoginButton';

export default function NavBar() {
    const LogoutButton = () => {
        const { logout } = useAuth0()

        return (
            <button onClick={() => logout({ logoutParams: {returnTo: window.location.origin}})}>
                Log Out
            </button>
        );
    };

    return (
        <nav>
            <LoginButton/>
            <LogoutButton />
        </nav>
    );
}