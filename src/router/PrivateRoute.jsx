import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => { // Pass protected content as children
  const navigate = useNavigate();
  const user = useAuth();
  console.log("element", Component);

  useEffect(() => {
    if (!user.token) { // Check authentication state (assuming isAuthenticated is returned by useAuth)
      navigate("/login");
    }
  }, [user]); // Re-run useEffect when user state changes

  return <Component {...rest} />;
};

export default PrivateRoute;
