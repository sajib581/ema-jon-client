import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
              (loggedInUser.email || loggedInUser.name)  ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;