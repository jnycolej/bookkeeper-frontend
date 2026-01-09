// Entry point for React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App';    // Import your main App component

import {Auth0Provider} from '@auth0/auth0-react';
import { redirect } from 'react-router';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE; 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider 
        domain={domain} 
        clientId={clientId} 
        authorizationParams={{
            redirect_uri: `${window.location.origin}/home`,
            audience,
            scope: 'read:books write:books read:current_user'
        }}
        cacheLocation="localstorage"
       // useRefreshTokens={true}
    >
        <App />
    </Auth0Provider>,
);