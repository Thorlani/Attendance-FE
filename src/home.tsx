import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./component/navbar";

const Home = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="container">
      <Navbar function={logOut} content={"Log Out"} />
      <h1>Home</h1>
      <p>list of courses available</p>
      <ul>
        <NavLink to={"/criminalLaw"}>
          <li>Criminal Law</li>
        </NavLink>
        <NavLink to={"/tort"}>
          <li>Law of Tort</li>
        </NavLink>
        <NavLink to={"/ct"}>
          <li>Commercial Transaction</li>
        </NavLink>
        <NavLink to={"/ip"}>
          <li>Intellectual Property</li>
        </NavLink>
        <NavLink to={"/hr"}>
          <li>Human Right</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Home;
