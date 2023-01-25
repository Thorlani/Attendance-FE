import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./signUp";
import Home from "./home";
import GuardRoute from "./guardRoute";
import CommercialTransaction from "./ct";
import IntellectualProperty from "./ip";
import CriminalLaw from "./criminalLaw";
import LawOfTort from "./tort";
import HumanRight from "./hr";
import "@picocss/pico";
import Register from "./register";
import ClProfile from "./component/clprofile";
import Ctprofile from "./component/ctprofile";
import IpProfile from "./component/ipProfile";
import LtProfile from "./component/ltProfile";
import HrProfile from "./component/hrProfile";

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<SignUp />} />
      <Route path="/register" element={<Register />} />
      <Route element={<GuardRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/ct" element={<CommercialTransaction />} />
        <Route path="/ct/profile/:id" element={<Ctprofile />} />
        <Route path="/ip" element={<IntellectualProperty />} />
        <Route path="/ip/profile/:id" element={<IpProfile />} />
        <Route path="/criminalLaw" element={<CriminalLaw />} />
        <Route path="/criminalLaw/profile/:id" element={<ClProfile />} />
        <Route path="/tort" element={<LawOfTort />} />
        <Route path="/tort/profile/:id" element={<LtProfile />} />
        <Route path="/hr" element={<HumanRight />} />
        <Route path="/hr/profile/:id" element={<HrProfile />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
