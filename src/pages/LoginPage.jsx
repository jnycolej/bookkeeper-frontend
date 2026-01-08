import React from "react";
import LoginButton from '../components/LoginButton';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import '../assets/bookkeeper.css';
import BookKeeperLogo from '../assets/BookKeeperLogo.png';

const LoginPage = () => {
    return (
        <body className="login-background">
        <div className="align-content-center ">
            <a href="/home"><img className="logo w-100" src={BookKeeperLogo}/></a>
            <h1 className="display-1 text-center ">Welcome to BookKeeper</h1>
            <h4 className="display-6 text-center">An app designed for tracking your reading goals.</h4>
            <div className="d-flex justify-content-center login-page-button">
                <LoginButton /> 
            </div>
            
        </div>            
        </body>

    )
}

export default LoginPage;