import React from "react";
import LoginButton from '../components/LoginButton';
import { withAuthenticationRequired } from "@auth0/auth0-react";

const LoginPage = () => {
    return (
        <div>
            <h1 className="display-1">Welcome to BookKeeper</h1>
            <h4 className="display-6">An app designed for tracking your reading goals.</h4>
            <LoginButton />
        </div>
    )
}

export default LoginPage;