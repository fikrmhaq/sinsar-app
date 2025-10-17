import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("token"); // or your auth flag

  // If not signed in, redirect to sign in page
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}