import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Home = () => {
  const navigate = useNavigate()
  const logOut = () => {
    Cookies.remove("user")
    navigate("/")
  }
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <strong>Lani's App</strong>
          </li>
        </ul>
        <ul>
          <li onClick={logOut}>
            <a href="#" role="button">
              Log Out
            </a>
          </li>
        </ul>
      </nav>
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
