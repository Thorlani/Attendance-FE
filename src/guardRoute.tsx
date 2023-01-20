import React from "react";
import cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = cookies.get("user");
  return user;
};

const GuardRoute = () => {
  const parameter = useSelector((state: any) => state.auth.parameter);
  const isAuthenticated = useAuth();

  return isAuthenticated || parameter ? <Outlet /> : <Navigate to="/" />;
};

export default GuardRoute;
