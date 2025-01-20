import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem("Token");
  const role = localStorage.getItem("Role");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/auth/login"  />;
  }

  if (!allowedRoles.includes(role)) {
    // If role is not allowed, redirect to unauthorized or dashboard page
    return <Navigate to="/unauthorized" />;
  }

  // Render the allowed component
  return <Component {...rest} />;
};

export default ProtectedRoute;
