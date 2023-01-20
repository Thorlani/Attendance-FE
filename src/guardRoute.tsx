import React from "react";
import cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";


const GuardRoute = () => {
  let user = localStorage.getItem("isLoggedIn")
  
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default GuardRoute;
