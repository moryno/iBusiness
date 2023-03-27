import React, { useState } from "react";
import "./getstarted.css";
import data from "../../../../data/pages/getstarted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setupLogin } from "../../../../helpers/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../redux/userSlice";
import request, { msSingleSign } from "../../../../helpers/requestMethod";

export const GetStarted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = location.state;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    fullName: user?.displayName,
    userName: user?.givenName,
    email: user?.userPrincipalName,
    telephone: "",
    physicalAddress: "",
    originCountry: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (inputs.password === inputs.confirmPassword) {
  //       await axios.post(
  //         "https://bookingapptrial.azurewebsites.net/register",
  //         inputs
  //       );
  //       navigate("/sign-in");
  //     } else {
  //       setError("Password does not match.");
  //     }
  //   } catch (error) {
  //     setError(error.response.data.Message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(msSingleSign, inputs, config);
      setupLogin(data?.token);
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="register-container">
      <div className="gs-container">
        <div className="gs-info">
          <p className="gs-header">{data.header}</p>
          <p className="gs-description">{data.subheader}</p>
          <ul className="gs-list">
            {data.functions.map((func) => (
              <li key={func}>
                <FontAwesomeIcon icon={faCheck} />
                &nbsp;&nbsp;{func}
              </li>
            ))}
          </ul>
        </div>
        <div className="gs-form">
          <p className="gs-subheader">{data.s_subheader}</p>
          <div className="gs-inputs">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.fullName}
            />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.userName}
            />
            <input
              type="email"
              name="fullNemailame"
              placeholder="Email"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.email}
            />
            <input
              type="text"
              name="physicalAddress"
              placeholder="Physical Address"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.physicalAddress}
            />
            <input
              type="text"
              name="telephone"
              placeholder="Telephone"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.telephone}
            />
            <input
              type="text"
              name="originCountry"
              placeholder="Origin Country"
              onChange={handleChange}
              className="gs-form-control"
              value={inputs.originCountry}
            />

            <button value="Submit" onClick={handleSubmit} className="gs-button">
              {data.btn_text}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
