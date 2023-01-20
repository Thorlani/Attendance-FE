import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "./redux/AuthAction";
import cookies from "js-cookie";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  type signup = boolean;
  const [stage, setStage] = useState<signup>(true);
  type signInDetails = {
    email: string;
    password: string;
  };
  const [signIn, setSignIn] = useState<signInDetails>({
    email: "",
    password: "",
  });

  type SignUpDetails = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };

  const [signUp, setSignUp] = useState<SignUpDetails>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChangeOne = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    setSignIn((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleChangeTwo = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    setSignUp((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleClick = () => {
    setStage(!stage);
  };

  const dispatch = useDispatch();

  const handleSubmitOne = () => {
    if (signIn.email === "" || signIn.password === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/user/login", {
          email: signIn.email,
          password: signIn.password,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(AuthAction(true));
            cookies.set("user", signIn.email, { expires: 1 });
            navigate("/home");
          }
        })
        .catch(() => {
          dispatch(AuthAction(false));
        });
    }
  };

  const wrongDetails = useSelector((state: any) => state.auth.parameter);

  const handleSubmitTwo = () => {
    if (
      signUp.email === "" ||
      signUp.password === "" ||
      signUp.firstname === "" ||
      signUp.lastname === ""
    ) {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/user/register", {
          firstname: signUp.firstname,
          lastname: signUp.lastname,
          email: signUp.email,
          password: signUp.password,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(AuthAction(true));
            cookies.set("user", signUp.email, { expires: 1 });
            navigate("/home");
          }
        })
        .catch(() => {
          dispatch(AuthAction(false));
        });
    }
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <strong>Lani's App</strong>
          </li>
        </ul>
      </nav>
      {stage === true && (
        <form>
          <h1>Sign In</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChangeOne}
              value={signIn.email}
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Password"
              onChange={handleChangeOne}
              value={signIn.password}
              name="password"
              required
            />
          </div>
          {wrongDetails === false && (
            <p
              style={{
                color: "red",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Invalid credentials!!
            </p>
          )}
          <p>
            Don't have an account yet?{" "}
            <a href="#" role={"button"} onClick={handleClick}>
              Sign Up
            </a>
          </p>
          <button type="button" onClick={handleSubmitOne}>
            Submit
          </button>
        </form>
      )}
      {stage === false && (
        <form>
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              placeholder="Firstname"
              onChange={handleChangeTwo}
              value={signUp.firstname}
              name="firstname"
            />
          </div>
          <div>
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              placeholder="Lastname"
              onChange={handleChangeTwo}
              value={signUp.lastname}
              name="lastname"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              onChange={handleChangeTwo}
              value={signUp.email}
              name="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Password"
              onChange={handleChangeTwo}
              value={signUp.password}
              name="password"
            />
          </div>
          {wrongDetails === false && (
            <p
              style={{
                color: "red",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Invalid credentials!!
            </p>
          )}
          <p>
            Signed Up already?{" "}
            <a href="#" role="button" onClick={handleClick}>
              Sign In
            </a>
          </p>
          <button type="button" onClick={handleSubmitTwo}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
