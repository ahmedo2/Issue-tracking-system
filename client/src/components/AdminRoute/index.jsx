import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ component: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
