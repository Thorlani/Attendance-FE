import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  type setStage = number;
  const [currentPage, setCurrentPage] = useState<setStage>(0);
  type formData = {
    matric: string;
    name: string;
  };
  const [form, setForm] = useState<formData>({
    matric: "",
    name: "",
  });

  const handleChange = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  type loader = boolean;
  const [isLoading, setIsLoading] = useState<loader>(false);

  type errorM = string;
  const [errorMessage, setErrorMessage] = useState<errorM>("");

  const handleSubmitOne = (event: { preventDefault: () => void }) => {
    setIsLoading(true);
    event.preventDefault();
    if (form.matric === "" || form.name === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/criminal", {
          matric: form.matric,
          name: form.name,
        })
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(0);
          window.location.reload();
          console.log("Registered Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data);
        });
    }
  };
  const handleSubmitTwo = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.matric === "" || form.name === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/commercial", {
          matric: form.matric,
          name: form.name,
        })
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(0);
          window.location.reload();
          console.log("Registered Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data);
        });
    }
  };
  const handleSubmitThree = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.matric === "" || form.name === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/tort", {
          matric: form.matric,
          name: form.name,
        })
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(0);
          window.location.reload();
          console.log("Registered Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data);
        });
    }
  };
  const handleSubmitFour = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.matric === "" || form.name === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/intellectual", {
          matric: form.matric,
          name: form.name,
        })
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(0);
          window.location.reload();
          console.log("Registered Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data);
        });
    }
  };
  const handleSubmitFive = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.matric === "" || form.name === "") {
      null;
    } else {
      axios
        .post("https://attendance-be.vercel.app/api/human", {
          matric: form.matric,
          name: form.name,
        })
        .then((res) => {
          setIsLoading(false);
          setCurrentPage(0);
          window.location.reload();
          console.log("Registered Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data);
        });
    }
  };

  const goBack = () => {
    setCurrentPage(0);
    setErrorMessage("");
    setForm({ ...form, matric: "", name: "" });
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
      {isLoading === true ? (
        <p>Registering course for attendance...</p>
      ) : (
        <>
          <h2>Register for the courses you'll be attending</h2>
          {currentPage === 0 && (
            <div>
              <p>List of available courses to register for.</p>
              <ul>
                <a href="#" onClick={() => setCurrentPage(1)}>
                  <li>Criminal Law</li>
                </a>
                <a href="#" onClick={() => setCurrentPage(2)}>
                  <li>Commercial Transaction</li>
                </a>
                <a href="#" onClick={() => setCurrentPage(3)}>
                  <li>Law of Tort</li>
                </a>
                <a href="#" onClick={() => setCurrentPage(4)}>
                  <li>Intellectual Property</li>
                </a>
                <a href="#" onClick={() => setCurrentPage(5)}>
                  <li>Human Right</li>
                </a>
              </ul>
            </div>
          )}
          {currentPage === 1 && (
            <>
              <nav>
                <ul>
                  <li>
                    <p>Criminal Law registration</p>
                  </li>
                </ul>
                <ul>
                  <li onClick={goBack}>
                    <a
                      href="#"
                      role="banner"
                      style={{ textDecoration: "underline" }}
                    >
                      go back
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <form>
                  <div>
                    <label htmlFor="matric">Matric Number</label>
                    <input
                      type="number"
                      name="matric"
                      value={form.matric}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="matric">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{errorMessage + "!"}</p>
                    </div>
                  )}
                  <button type="button" onClick={handleSubmitOne}>
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
          {currentPage === 2 && (
            <>
              <nav>
                <ul>
                  <li>
                    <p>Commercial Transaction registration</p>
                  </li>
                </ul>
                <ul>
                  <li onClick={goBack}>
                    <a
                      href="#"
                      role="banner"
                      style={{ textDecoration: "underline" }}
                    >
                      go back
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <form>
                  <div>
                    <label htmlFor="matric">Matric Number</label>
                    <input
                      type="number"
                      name="matric"
                      value={form.matric}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="matric">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{errorMessage + "!"}</p>
                    </div>
                  )}
                  <button type="button" onClick={handleSubmitTwo}>
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
          {currentPage === 3 && (
            <>
              <nav>
                <ul>
                  <li>
                    <p>Law of Tort registration</p>
                  </li>
                </ul>
                <ul>
                  <li onClick={goBack}>
                    <a
                      href="#"
                      role="banner"
                      style={{ textDecoration: "underline" }}
                    >
                      go back
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <form>
                  <div>
                    <label htmlFor="matric">Matric Number</label>
                    <input
                      type="number"
                      name="matric"
                      value={form.matric}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="matric">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{errorMessage + "!"}</p>
                    </div>
                  )}
                  <button type="button" onClick={handleSubmitThree}>
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
          {currentPage === 4 && (
            <>
              <nav>
                <ul>
                  <li>
                    <p>Intellectual Property registration</p>
                  </li>
                </ul>
                <ul>
                  <li onClick={goBack}>
                    <a
                      href="#"
                      role="banner"
                      style={{ textDecoration: "underline" }}
                    >
                      go back
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <form>
                  <div>
                    <label htmlFor="matric">Matric Number</label>
                    <input
                      type="number"
                      name="matric"
                      value={form.matric}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="matric">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{errorMessage + "!"}</p>
                    </div>
                  )}
                  <button type="button" onClick={handleSubmitFour}>
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
          {currentPage === 5 && (
            <>
              <nav>
                <ul>
                  <li>
                    <p>Human Right registration</p>
                  </li>
                </ul>
                <ul>
                  <li onClick={goBack}>
                    <a
                      href="#"
                      role="banner"
                      style={{ textDecoration: "underline" }}
                    >
                      go back
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <form>
                  <div>
                    <label htmlFor="matric">Matric Number</label>
                    <input
                      type="number"
                      name="matric"
                      value={form.matric}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="matric">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errorMessage !== "" && (
                    <div>
                      <p style={{ color: "red" }}>{errorMessage + "!"}</p>
                    </div>
                  )}
                  <button type="button" onClick={handleSubmitFive}>
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
