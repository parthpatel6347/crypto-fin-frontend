import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authContext from "../context/auth/authContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading } = useContext(authContext);

  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
}

export default PrivateRoute;
