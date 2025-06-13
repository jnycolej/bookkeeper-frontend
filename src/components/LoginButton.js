import React from "react";
import {useAuth0} from '@auth0/auth0-react';
import api from '../services/api';


const LoginButton = () => {
    const  { loginWithRedirect } = useAuth0();

    return <button className="btn btn-primary w-50" onClick={() => loginWithRedirect()}>Log In</button>
};

export default LoginButton;