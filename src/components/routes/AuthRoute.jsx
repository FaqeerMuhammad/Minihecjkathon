import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const isAuthenticated = !!localStorage.getItem("uid");

  console.log("AuthRoute check:", isAuthenticated);

  // If user is already logged in → go to dashboard
  // Otherwise → show login/signup (Outlet)
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRoute;
