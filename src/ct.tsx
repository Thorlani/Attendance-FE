import React, { useState } from "react";
import { DATA } from "./data";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import "@picocss/pico";

const CommercialTransaction = () => {
  const navigate = useNavigate();
  const data = DATA;

  type input = {
    appearance: number;
    isDisplay: boolean;
  };
  const [totalAppearance, setTotalAppearance] = useState<input>({
    appearance: 0,
    isDisplay: false,
  });

  const handleChange = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    setTotalAppearance((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  type form = {
    matric: string;
    name: string;
    imagePath: string;
  };

  const [formData, setFormData] = useState<form>({
    matric: "",
    name: "",
    imagePath: "",
  });

  const handleChangeTwo = (event: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleClick = () => {
    setTotalAppearance({ ...totalAppearance, isDisplay: true });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios
      .post("http://localhost:3005/api/postCt", {
        matric: formData.matric,
        name: formData.name,
        imagePath: formData.imagePath,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data: ctAttendance } = useQuery("getting-ct-attendance", () =>
    axios.get("http://localhost:3005/api/getCt"),
    {
      staleTime: 500_000
    }
  );

  const dat = ctAttendance?.data;

  console.log(dat);
  

  return (
    <div className="container" style={{ width: "100%" }}>
      <nav>
        <ul>
          <li>
            <strong>Lani's App</strong>
          </li>
        </ul>
        <ul>
          <li onClick={() => navigate("/home")}>
            <a href="#" role="button">
              Back
            </a>
          </li>
        </ul>
      </nav>
      <h1>Commercial Transaction</h1>
      <p>Attendance</p>
      <div>
        <input
          type="number"
          name="appearance"
          value={totalAppearance.appearance}
          onChange={handleChange}
          style={{ width: "180px" }}
        />
        <a
          href="#"
          role="button"
          style={{ marginLeft: "10px" }}
          onClick={handleClick}
        >
          Enter
        </a>
      </div>
      <div style={{ width: "100%", height: "fit", marginTop: "20px" }}>
        <figure>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ width: "100%", textAlign: "center" }}>
                <th>Matric No</th>
                <th>Name</th>
                <th>Total App.</th>
                <th>Cutoff Mark(66%)</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {data.map(
                (item: { matric: string; name: string; date: string }) => {
                  return (
                    <tr>
                      <td>{item?.matric}</td>
                      <td>{item?.name}</td>
                      <td>
                        {
                          data.filter(
                            (obj: {
                              matric: string;
                              name: string;
                              date: string;
                              signature: string;
                            }) => {
                              return obj.matric === item.matric;
                            }
                          ).length
                        }
                      </td>
                      {totalAppearance.isDisplay && (
                        <td>
                          {(data.filter(
                            (obj: {
                              matric: string;
                              name: string;
                              date: string;
                              signature: string;
                            }) => {
                              return obj.matric === item.matric;
                            }
                          ).length /
                            totalAppearance.appearance) *
                            100}
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </figure>
      </div>
      <div>
        <form>
          <div>
            <label htmlFor="matric">Matric Number</label>
            <input
              type="number"
              name="matric"
              value={formData.matric}
              onChange={handleChangeTwo}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChangeTwo}
            />
          </div>
          <div>
            <label htmlFor="imagePath">Photo</label>
            <input
              type="file"
              name="imagePath"
              value={formData.imagePath}
              onChange={handleChangeTwo}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommercialTransaction;
