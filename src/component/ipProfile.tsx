import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { useQuery } from "react-query";

const IpProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const home = () => {
    navigate("/home");
  };

  const { data, isLoading, isError } = useQuery("ip-profile", () =>
    axios.get(`https://attendance-be.vercel.app/api/Intellectual/${id}`)
  );

  const { data: listOfCl } = useQuery("ip", () =>
    axios.get(`https://attendance-be.vercel.app/api/getIp`)
  );

  const allAttendance = listOfCl?.data;

  type profileDetails = {
    name: string;
    imagePath: string;
    matric: string;
  };

  const details: profileDetails = data?.data;

  let mee: any[] = [];

  let x = allAttendance?.map((item: any) => {
    if (item?.matric === details?.matric) {
      mee.push(item);
    }
  });

  let trimString = function (str: string, length: number) {
    return str.length > length ? str.substring(0, length) : str;
  };

  return (
    <div className="container">
      <Navbar function={home} content={"Back to home page"} />
      <h1>Hello {details?.name}</h1>
      <img
        src={`${details?.imagePath}`}
        alt="profile photo"
        style={{ width: "150px", height: "150px", objectFit: "contain" }}
      />
      <p>list of intellectual property classes attended</p>
      <figure>
        <table>
          <thead>
            <tr style={{ width: "100%", textAlign: "center" }}>
              <th>Matric No</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mee.map((item: any) => {
              return (
                <tr>
                  <td>{item?.matric}</td>
                  <td>{item?.name}</td>
                  <td>{trimString(item?.date, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </figure>
    </div>
  );
};

export default IpProfile;
