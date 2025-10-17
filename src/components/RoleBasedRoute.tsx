// src/components/RoleBasedRoute.jsx
import { Navigate, Outlet } from "react-router";

const RoleBasedRoute = ({ allowedRoles }: any) => {
  // Example: You might store user info in localStorage after login
  const user_storage: any = localStorage.getItem("user")
  const user = JSON.parse(user_storage);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.Role)) {
    // Redirect or show forbidden page
    return <Navigate to="/blank" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;