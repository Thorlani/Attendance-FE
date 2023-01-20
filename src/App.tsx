import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route element={<GuardRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/ct" element={<CommercialTransaction />} />
          <Route path="/ip" element={<IntellectualProperty />} />
          <Route path="/criminalLaw" element={<CriminalLaw />} />
          <Route path="/tort" element={<LawOfTort />} />
          <Route path="/hr" element={<HumanRight />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
