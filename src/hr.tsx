import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Navbar from "./component/navbar";
import { useSelector, useDispatch } from "react-redux";
import { AuthAction, RedoAction } from "./redux/AuthAction";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    filename?: string;
  }
}

const HumanRight = () => {
  const parameter = useSelector((state: any) => state.auth.parameter);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  type loader = boolean;
  const [Loading, setLoading] = useState<loader>(false);

  type input = {
    appearance: number;
    isDisplay: boolean;
  };
  const [totalAppearance, setTotalAppearance] = useState<input>({
    appearance: 0,
    isDisplay: false,
  });

  type search = string;
  const [searchField, setSearchField] = useState<search>();

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
    imagePath?: string;
  };

  const [formData, setFormData] = useState<form>({
    matric: "",
    name: "",
  });

  const [filename, setFilename] = useState("");

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

  const onChangeFile = (event: any) => {
    setFilename(event.target.files[0]);
  };

  const handleClick = () => {
    setTotalAppearance({ ...totalAppearance, isDisplay: true });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    setLoading(true);
    event.preventDefault();

    const formDatas = new FormData();

    formDatas.append("matric", formData.matric);
    formDatas.append("name", formData.name);
    formDatas.append("Image", filename);
    axios
      .post("https://attendance-be.vercel.app/api/postHr", formDatas)
      .then((res) => {
        setLoading(false);
        setFormData({ ...formData, matric: "", name: "" });
        setFilename("");
        setIsDisplayStage(0);
        dispatch(AuthAction());
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const {
    data: ctAttendance,
    isLoading,
    isError,
  } = useQuery("getting-lt-attendance", () =>
    axios.get("https://attendance-be.vercel.app/api/human")
  );

  const {
    data: attended,
    isLoading: attendLoading,
    isError: attendError,
  } = useQuery("lt-attendance", () =>
    axios.get("https://attendance-be.vercel.app/api/getHr")
  );

  const data = ctAttendance?.data;
  const totalAttend = attended?.data;

  type setDisplayStage = number;
  const [isDisplayStage, setIsDisplayStage] = useState<setDisplayStage>(0);

  const home = () => {
    navigate("/home");
  };

  type searchRes = any;
  const [searchResult, setSearchResult] = useState<searchRes>([]);

  const [searchLoader, setSearchLoader] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const searchMatric = (e: { preventDefault: () => void }) => {
    setSearchLoader(true);
    setLoadingResult(true);
    e.preventDefault();

    if (!searchField) {
      setSearchLoader(false);
      setLoadingResult(false);
    } else {
      axios
        .get(`https://attendance-be.vercel.app/api/human/find/${searchField}`)
        .then((res) => {
          setSearchResult(res.data);
          setLoadingResult(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingResult(false);
        });
    }
  };

  type pass = string;
  const [attendancePass, setAttendancePass] = useState<pass>("");
  const match: string = "lawFaculty123";

  return (
    <div className="container" style={{ width: "100%" }}>
      <Navbar
        function={parameter === 5 ? null : home}
        content={"Back to home page"}
      />
      {parameter === 10 ? (
        <div>
          <h2>10 people already signed attendance</h2>
          <p>Authorize to make others sign attendance</p>
          <div>
            <input
              type="text"
              name="redo"
              value={attendancePass}
              onChange={(e) => setAttendancePass(e.target.value)}
            />
            <a
              href="#"
              role="button"
              onClick={() => {
                if (attendancePass === match) dispatch(RedoAction());
              }}
            >
              Authorize
            </a>
          </div>
        </div>
      ) : Loading === true ? (
        <p>Submitting Attendance</p>
      ) : (
        <>
          <h1>Human Right</h1>
          {isDisplayStage === 0 ? (
            <>
              <p>What would you like to do?</p>
              <div>
                <button type="button" onClick={() => setIsDisplayStage(2)}>
                  Sign Attendance
                </button>
                <button type="button" onClick={() => setIsDisplayStage(1)}>
                  Check Attendance
                </button>
              </div>
            </>
          ) : isDisplayStage === 1 ? (
            <div style={{ display: "flex" }}>
              <p>List of Attendance</p>
              <a
                href="#"
                role={"banner"}
                style={{ marginLeft: "15px" }}
                onClick={() => setIsDisplayStage(0)}
              >
                go back
              </a>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <p>Sign your Attendance</p>
              <a
                href="#"
                role={"banner"}
                style={{ marginLeft: "15px" }}
                onClick={() => setIsDisplayStage(0)}
              >
                go back
              </a>
            </div>
          )}
          {isDisplayStage === 1 && (
            <>
              <div>
                <div>
                  <label htmlFor="setTotalAppearance">
                    Set Total Appearance
                  </label>
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
                <div>
                  <label htmlFor="setTotalAppearance">
                    Search for student by matric number
                  </label>
                  <input
                    type="search"
                    name="appearance"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    style={{ width: "180px" }}
                  />
                  <a
                    href="#"
                    role="button"
                    style={{ marginLeft: "10px" }}
                    onClick={
                      searchLoader === true
                        ? () => {
                            setSearchLoader(false);
                            setSearchField("");
                          }
                        : searchMatric
                    }
                  >
                    {searchLoader === true ? "Cancel" : "Enter"}
                  </a>
                </div>
              </div>
              {searchLoader === true ? (
                <>
                  {loadingResult === true ? (
                    <p style={{ textAlign: "center", marginTop: "25px" }}>
                      Searching for student
                    </p>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "fit",
                        marginTop: "20px",
                      }}
                    >
                      <figure>
                        <table style={{ width: "100%" }}>
                          <thead>
                            <tr style={{ width: "100%", textAlign: "center" }}>
                              <th>DP</th>
                              <th>Matric No</th>
                              <th>Name</th>
                              <th>Total App.</th>
                              <th>Cutoff Mark(66%)</th>
                            </tr>
                          </thead>
                          <tbody style={{ textAlign: "center" }}>
                            {searchResult.map(
                              (item: {
                                _id: string;
                                imagePath: any;
                                matric: string;
                                name: string;
                              }) => {
                                return (
                                  <tr key={item?._id}>
                                    <td>
                                      <img
                                        src={item?.imagePath}
                                        alt="student photo"
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "contain" }}
                                      />
                                    </td>
                                    <td>
                                      <Link to={`/hr/profile/${item._id}`}>
                                        {item?.matric}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link to={`/hr/profile/${item._id}`}>
                                        {item?.name}
                                      </Link>
                                    </td>
                                    <td>
                                      {attendError === true ? (
                                        <p>Error</p>
                                      ) : attendLoading === true ? (
                                        <p>loading</p>
                                      ) : (
                                        totalAttend.filter(
                                          (obj: {
                                            matric: string;
                                            name: string;
                                            date: string;
                                          }) => {
                                            return obj.matric === item.matric;
                                          }
                                        ).length
                                      )}
                                    </td>
                                    {totalAppearance.isDisplay && (
                                      <td>
                                        {attendError === true ? (
                                          <p>Error</p>
                                        ) : attendLoading === true ? (
                                          <p>loading</p>
                                        ) : (
                                          (totalAttend.filter(
                                            (obj: {
                                              matric: string;
                                              name: string;
                                              date: string;
                                            }) => {
                                              return obj.matric === item.matric;
                                            }
                                          ).length /
                                            totalAppearance.appearance) *
                                          100
                                        )}
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
                  )}
                </>
              ) : (
                <>
                  {isError === true ? (
                    <p>Table content cannot be fetched due to network error</p>
                  ) : isLoading === true ? (
                    <p>Table content is loading currently</p>
                  ) : (
                    <figure>
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr style={{ width: "100%", textAlign: "center" }}>
                            <th>DP</th>
                            <th>Matric No</th>
                            <th>Name</th>
                            <th>Total App.</th>
                            <th>Cutoff Mark(66%)</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {data.map(
                            (item: {
                              _id: string;
                              imagePath: any;
                              matric: string;
                              name: string;
                            }) => {
                              return (
                                <tr key={item?._id}>
                                  <td>
                                    <img
                                      src={item?.imagePath}
                                      alt="student photo"
                                      width={50}
                                      height={50}
                                      style={{ objectFit: "contain" }}
                                    />
                                  </td>
                                  <td>
                                    <Link to={`/hr/profile/${item._id}`}>
                                      {item?.matric}
                                    </Link>
                                  </td>
                                  <td>
                                    <Link to={`/hr/profile/${item._id}`}>
                                      {item?.name}
                                    </Link>
                                  </td>
                                  <td>
                                    {attendError === true ? (
                                      <p>Error</p>
                                    ) : attendLoading === true ? (
                                      <p>loading</p>
                                    ) : (
                                      totalAttend.filter(
                                        (obj: {
                                          matric: string;
                                          name: string;
                                          date: string;
                                        }) => {
                                          return obj.matric === item.matric;
                                        }
                                      ).length
                                    )}
                                  </td>
                                  {totalAppearance.isDisplay && (
                                    <td>
                                      {attendError === true ? (
                                        <p>Error</p>
                                      ) : attendLoading === true ? (
                                        <p>loading</p>
                                      ) : (
                                        (totalAttend.filter(
                                          (obj: {
                                            matric: string;
                                            name: string;
                                            date: string;
                                          }) => {
                                            return obj.matric === item.matric;
                                          }
                                        ).length /
                                          totalAppearance.appearance) *
                                        100
                                      )}
                                    </td>
                                  )}
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </figure>
                  )}
                </>
              )}
            </>
          )}
          {isDisplayStage === 2 && (
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
                  <label htmlFor="image">Photo</label>
                  <input
                    type="file"
                    filename="Image"
                    value={formData.imagePath}
                    onChange={onChangeFile}
                  />
                </div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HumanRight;
