import React from 'react';
import { isAuthenticated } from '../component/container/Auth';
import { Redirect } from 'react-router-dom';
import ROUTES from './Static'

/**
    * @description  This method checks to see if the user is authentication or not
    * @param {null} 
    * @return {route} redirect route after authentication
    */


export const ProtectedRoutes = (props) => {
    const Component = props.component
    return isAuthenticated() ?
        <Component {...props}/> :
        <Redirect {...props} to={{ pathname: ROUTES.login, state: { from: props.location } }} />
}

export const PublicRoutes = (props) => {
    const Component = props.component
    return !isAuthenticated() ?
        <Component {...props} /> :
        <Redirect {...props} to={{ pathname: ROUTES.dashboard }} />
}


