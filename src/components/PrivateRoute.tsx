import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { app } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
