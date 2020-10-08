import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../store';


const PrivateRoute = ({component: Component, ...rest}) => {

    const state = store.getState();
    const isAuthenticated = state.auth.isAuthenticated;
    console.log(state);
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;