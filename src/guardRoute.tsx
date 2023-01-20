import React from "react";
import cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";


const GuardRoute = () => {
  const user = cookies.get("user");

  console.log(user);
  

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default GuardRoute;
