import React, { useState } from "react";
import { toast } from "react-toastify";
import "./getstarted.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import data from "../../../../data/pages/getstarted";
import { setUpToken } from "../../../../helpers/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../redux/userSlice";
import { msSingleSign } from "../../../../utils/webService";

export const GetStarted = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get the user graphInfo and token sent from login page
  const { user, token } = location?.state;

  // Set the input values from user information received from Microsoft Identity
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

  // Set Authorization header with token to use when registering a new user
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Get use info entered in the register form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  // Register form submission function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(msSingleSign, inputs, config);
      setLoading(false);
      toast.success("Registered successfully");
      setUpToken(data?.token);
      // Set the user state to redux/ userSlice
      dispatch(loginSuccess(data));
      // navigate to dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("A problem has occured!");
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
