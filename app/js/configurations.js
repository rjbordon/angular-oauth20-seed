'use strict';

/* Configurations */

var configurations = angular.module('myApp.configurations', []);
configurations
    .constant('IDP',
    {
        name: 'Google',
        authzEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        tokenInfoEndpoint: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
        userInfoEndpoint: 'https://www.googleapis.com/plus/v1/people/me',
        application: {
            apiKey: 'YOUR_GOOGLE_OAUTH20_CLIENT_ID',
            apiSecret: 'not_needed_on_oauth20_implicit_grant',
            redirectUri: 'http://localhost:8000/app/dashboard.html',
            scopes: ['email'],
            responseType: 'token'
        }
    }
    );
