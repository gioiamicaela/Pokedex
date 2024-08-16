import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token'); // Verificar si hay un token en el localStorage

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default ProtectedRoute;
