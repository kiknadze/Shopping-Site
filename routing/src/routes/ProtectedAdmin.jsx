import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedAdmin = ( {component: Component, ...restProps} ) => {
    return (
    <Route {...restProps}
    render={ props => JSON.parse(localStorage.getItem('User')).level === '0' ? 
        (<Component {...props}/>) : 
        ( <Redirect to={`/`} /> ) 
    }
    />
    )
}